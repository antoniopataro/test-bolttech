export type User = {
  id: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};

export type UserFromAccessToken = {
  id: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};

export class UserEntity {
  private readonly _id: string;
  private readonly _email: string;
  private readonly _createdAt: string;
  private readonly _updatedAt: string;

  constructor(attributes: User) {
    this._id = attributes.id;
    this._email = attributes.email;
    this._createdAt = attributes.createdAt;
    this._updatedAt = attributes.updatedAt;
  }

  public get id(): string {
    return this._id;
  }

  public get email(): string {
    return this._email;
  }

  public get createdAt(): string {
    return this._createdAt;
  }

  public get updatedAt(): string {
    return this._updatedAt;
  }
}
