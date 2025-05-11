import type { DocumentEntity, IDocumentRepository } from "@/domain/document";
import type { ISearchRepository, SearchEntity } from "@/domain/search";
import type { IUserRepository } from "@/domain/user";
import { DocumentType } from "@/shared/enums";
import { Command } from "@/shared/utils/command";
import { ConflictError, NotFoundError } from "@/shared/utils/errors";

type Params = {
  searchId: string;
  userId: string;
};

type RelatedEntities = {
  license: DocumentEntity | null;
  search: SearchEntity;
};

type Result = {
  pendencies: Partial<{
    license: string;
  }>;
};

export class GetBookingPendenciesCommand extends Command {
  private readonly LICENSE_PENDING_MESSAGES = {
    HAS_EXPIRED: "License has expired.",
    MISSING: "License document not found.",
    WILL_EXPIRE: "License will expire before the booking.",
  };

  constructor(
    private readonly documentRepository: IDocumentRepository,
    private readonly searchRepository: ISearchRepository,
    private readonly userRepository: IUserRepository,
  ) {
    super(GetBookingPendenciesCommand.name);
  }

  public async execute(params: Params): Promise<Result> {
    try {
      this.logInitiated();

      const { license, search } = await this.getRelatedEntities(params);

      if (!license) {
        return {
          pendencies: {
            license: this.LICENSE_PENDING_MESSAGES.MISSING,
          },
        };
      }
      if (license.expiresBefore(search.getEndDate())) {
        return {
          pendencies: {
            license: this.LICENSE_PENDING_MESSAGES.WILL_EXPIRE,
          },
        };
      }
      if (license.hasExpired()) {
        return {
          pendencies: {
            license: this.LICENSE_PENDING_MESSAGES.HAS_EXPIRED,
          },
        };
      }

      this.logFinished();

      return {
        pendencies: {},
      };
    } catch (error) {
      this.logFailed();

      throw error;
    }
  }

  private async getRelatedEntities(params: Params): Promise<RelatedEntities> {
    const { searchId, userId } = params;

    const [search, user] = await Promise.all([
      this.searchRepository.findById(searchId),
      this.userRepository.findById(userId),
    ]);

    if (!search) {
      throw new NotFoundError("Search not found");
    }
    if (!user) {
      throw new NotFoundError("User not found");
    }

    const license = await this.documentRepository.findUserByType(
      DocumentType.LICENSE,
      userId,
    );

    return { license, search };
  }

  private guardAgainstExpiredLicense(license: DocumentEntity | null): void {
    if (!license) {
      return;
    }

    if (license.expirationDate < new Date().toISOString()) {
      throw new ConflictError("License has expired.");
    }
  }

  private guardAgainstExpiringLicense(
    license: DocumentEntity | null,
    search: SearchEntity,
  ): void {
    if (!license) {
      return;
    }

    const endDate = search.getEndDate();

    if (license.expirationDate < endDate) {
      throw new ConflictError("License will expire before the booking.");
    }
  }

  private guardAgainstMissingLicense(license: DocumentEntity | null): void {
    if (!license) {
      throw new ConflictError("License document not found.");
    }
  }
}
