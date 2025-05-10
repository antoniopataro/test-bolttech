import type { Document, IDocumentRepository } from "@/domain/document";
import type { IUserRepository } from "@/domain/user/iuser.repository";
import type { DocumentType } from "@/shared/enums";
import { Command } from "@/shared/utils/command";

type Params = {
  expirationDate: string;
  type: DocumentType;
  userId: string;
};

type Result = {
  document: Document;
};

export class SaveDocumentCommand extends Command {
  constructor(
    private readonly documentRepository: IDocumentRepository,
    private readonly userRepository: IUserRepository,
  ) {
    super(SaveDocumentCommand.name);
  }

  public async execute(params: Params): Promise<Result> {
    try {
      this.logInitiated();

      const user = await this.userRepository.findById(params.userId);

      if (!user) {
        throw new Error("User not found");
      }

      const document = await this.documentRepository.upsert(params);

      this.logFinished();

      return {
        document: document.toDocument(),
      };
    } catch (error) {
      this.logFailed();

      throw error;
    }
  }
}
