import { v4 as uuidv4 } from "uuid";

import {
  type IUserRepository,
  type UserCreationAttributes,
  UserEntity,
} from "@/domain/user";

export class InMemoryUserRepository implements IUserRepository {
  private users: UserEntity[] = [];

  //

  public async create(data: UserCreationAttributes): Promise<UserEntity> {
    const user = new UserEntity({
      ...data,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    this.users.push(user);

    return user;
  }

  public async findByEmail(email: string): Promise<UserEntity | null> {
    const user = this.users.find((user) => user.email === email);

    if (!user) {
      return null;
    }

    return user;
  }

  public async findById(id: string): Promise<UserEntity | null> {
    const user = this.users.find((user) => user.id === id);

    if (!user) {
      return null;
    }

    return user;
  }
}
