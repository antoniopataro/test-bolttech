import type {
  Document,
  DocumentEntity,
  IDocumentRepository,
} from "@/domain/document";
import { Command } from "@/shared/utils/command";

type Params = {
  userId: string;
};

type Result = {
  documents: Document[];
};
export class ListDocumentsCommand extends Command {
  constructor(private readonly documentRepository: IDocumentRepository) {
    super(ListDocumentsCommand.name);
  }

  public async execute(params: Params): Promise<Result> {
    try {
      this.logInitiated();

      const { documents } = await this.getRelatedEntities(params);

      this.logFinished();

      return {
        documents: documents.map((document) => document.toDocument()),
      };
    } catch (error) {
      this.logFailed();

      throw error;
    }
  }

  private async getRelatedEntities(params: Params): Promise<{
    documents: DocumentEntity[];
  }> {
    const { userId } = params;

    const documents = await this.documentRepository.listByUserId(userId);

    return { documents };
  }
}
