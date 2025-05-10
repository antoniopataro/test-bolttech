import type { UserEntity } from "./user.entity";
import type { UserCreationAttributes } from "./user.types";

export interface IUserRepository {
  create(data: UserCreationAttributes): Promise<UserEntity>;
  findByEmail(email: string): Promise<UserEntity | null>;
  findById(id: string): Promise<UserEntity | null>;
}
