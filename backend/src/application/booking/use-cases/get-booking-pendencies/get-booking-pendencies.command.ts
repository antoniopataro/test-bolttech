import type { DocumentEntity, IDocumentRepository } from "@/domain/document";
import type { ISearchRepository, SearchEntity } from "@/domain/search";
import type { IUserRepository } from "@/domain/user";
import { DocumentType } from "@/shared/enums";
import { Command } from "@/shared/utils/command";

type Params = {
  searchId: string;
  userId: string;
};

type RelatedEntities = {
  license: DocumentEntity | null;
  search: SearchEntity;
};

type Result = {
  pendencies: {
    license: boolean;
  };
};

export class GetBookingPendenciesCommand extends Command {
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

      try {
        this.guardAgainstMissingLicense(license);

        this.guardAgainstExpiredLicense(license);
        this.guardAgainstExpiringLicense(license, search);
      } catch {
        return {
          pendencies: {
            license: true,
          },
        };
      }

      this.logFinished();

      return {
        pendencies: {
          license: false,
        },
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
      throw new Error("Search not found");
    }
    if (!user) {
      throw new Error("User not found");
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
      throw new Error("License has expired.");
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
      throw new Error("License will expire before the booking.");
    }
  }

  private guardAgainstMissingLicense(license: DocumentEntity | null): void {
    if (!license) {
      throw new Error("License document not found.");
    }
  }
}
