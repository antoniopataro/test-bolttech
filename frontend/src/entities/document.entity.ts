import type { LicenseFormSchema } from "@/components/license-form/license-form.schema";
import type { DocumentType } from "@/shared/enums";

export type Document = {
  id: string;
  expirationDate: string;
  type: DocumentType;
  userId: string;
  createdAt: string;
  updatedAt: string;
};

export class DocumentEntity {
  private readonly _id: string;
  private readonly _expirationDate: string;
  private readonly _type: DocumentType;
  private readonly _userId: string;
  private readonly _createdAt: string;
  private readonly _updatedAt: string;

  constructor(attributes: Document) {
    this._id = attributes.id;
    this._expirationDate = attributes.expirationDate;
    this._type = attributes.type;
    this._userId = attributes.userId;
    this._createdAt = attributes.createdAt;
    this._updatedAt = attributes.updatedAt;
  }

  public get id(): string {
    return this._id;
  }

  public get expirationDate(): string {
    return this._expirationDate;
  }

  public get type(): DocumentType {
    return this._type;
  }

  public get userId(): string {
    return this._userId;
  }

  public get createdAt(): string {
    return this._createdAt;
  }

  public get updatedAt(): string {
    return this._updatedAt;
  }

  //

  public toLicenseSchema(): LicenseFormSchema {
    return {
      expirationDate: new Date(this._expirationDate),
      type: this._type,
    };
  }
}
