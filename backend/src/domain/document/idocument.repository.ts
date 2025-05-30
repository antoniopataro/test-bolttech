import type { DocumentType } from "@/shared/enums";

import type { DocumentEntity } from "./document.entity";
import type { DocumentCreationAttributes } from "./document.types";

export interface IDocumentRepository {
  findUserByType(
    type: DocumentType,
    userId: string,
  ): Promise<DocumentEntity | null>;
  listByUserId(userId: string): Promise<DocumentEntity[]>;
  upsert(document: DocumentCreationAttributes): Promise<DocumentEntity>;
}
