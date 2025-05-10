import type { DocumentType } from "@/shared/enums";

export type DocumentAttributes = {
  id: string;
  expirationDate: string;
  type: DocumentType;
  userId: string;
  createdAt: string;
  updatedAt: string;
};

export type DocumentCreationAttributes = Omit<
  DocumentAttributes,
  "id" | "createdAt" | "updatedAt"
>;

export type Document = {
  id: string;
  expirationDate: string;
  type: DocumentType;
  userId: string;
  createdAt: string;
  updatedAt: string;
};
