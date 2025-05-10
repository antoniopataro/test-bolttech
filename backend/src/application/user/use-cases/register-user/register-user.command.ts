import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { envs } from "@/config/envs";
import type { IUserRepository, UserEntity } from "@/domain/user";
import { Command } from "@/shared/utils/command";
import { ConflictError } from "@/shared/utils/errors";

type Params = {
  email: string;
  password: string;
};

type Result = {
  token: string;
};

export class RegisterUserCommand extends Command {
  constructor(private readonly userRepository: IUserRepository) {
    super(RegisterUserCommand.name);
  }

  public async execute(params: Params): Promise<Result> {
    try {
      this.logInitiated();

      await this.guardAgainstExistingUser(params);

      const hashedPassword = await this.hashPassword(params.password);

      const user = await this.userRepository.create({
        email: params.email,
        password: hashedPassword,
      });

      const token = this.generateToken(user);

      this.logFinished();

      return {
        token,
      };
    } catch (error) {
      this.logFailed();

      throw error;
    }
  }

  private async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 8);
  }

  private generateToken(user: UserEntity): string {
    const payload = user.toJson();

    return jwt.sign(payload, envs.JWT_SECRET);
  }

  private async guardAgainstExistingUser(params: Params): Promise<void> {
    const existingUser = await this.userRepository.findByEmail(params.email);

    if (!existingUser) {
      return;
    }

    throw new ConflictError("An user with this email already exists.");
  }
}
