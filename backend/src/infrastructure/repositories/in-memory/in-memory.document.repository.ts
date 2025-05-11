import { v4 as uuidv4 } from "uuid";

import type {
  DocumentCreationAttributes,
  IDocumentRepository,
} from "@/domain/document";
import { DocumentEntity } from "@/domain/document";
import type { DocumentType } from "@/shared/enums";

export class InMemoryDocumentRepository implements IDocumentRepository {
  private documents: DocumentEntity[] = [];

  public async findUserByType(
    type: DocumentType,
    userId: string,
  ): Promise<DocumentEntity | null> {
    return (
      this.documents.find(
        (document) => document.type === type && document.userId === userId,
      ) || null
    );
  }

  public async listByUserId(userId: string): Promise<DocumentEntity[]> {
    return this.documents.filter((document) => document.userId === userId);
  }

  public async upsert(
    data: DocumentCreationAttributes,
  ): Promise<DocumentEntity> {
    const existingDocument = await this.findUserByType(data.type, data.userId);

    if (!existingDocument) {
      const document = new DocumentEntity({
        ...data,
        id: uuidv4(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      this.documents.push(document);

      return document;
    }

    const updatedDocument = new DocumentEntity({
      ...existingDocument.toModel(),
      ...data,
    });

    this.documents = this.documents.map((document) =>
      document.id === existingDocument.id ? updatedDocument : document,
    );

    return updatedDocument;
  }
}
