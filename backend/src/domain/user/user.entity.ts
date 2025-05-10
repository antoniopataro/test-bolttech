import bcrypt from "bcryptjs";

import type { UserAttributes } from "./user.types";

export class UserEntity {
  private readonly _id: string;
  private readonly _email: string;
  private readonly _createdAt: string;
  private readonly _updatedAt: string;
  private readonly _password?: string;

  constructor(attributes: UserAttributes & { password?: string }) {
    this._createdAt = attributes.createdAt;
    this._email = attributes.email;
    this._id = attributes.id;
    this._password = attributes.password;
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

  //

  public async comparePassword(password: string): Promise<boolean> {
    if (!this._password) {
      return false;
    }

    return await bcrypt.compare(password, this._password);
  }

  public toJson(): UserAttributes {
    return {
      id: this._id,
      email: this._email,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
    };
  }
}
