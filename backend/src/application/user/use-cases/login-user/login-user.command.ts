import jwt from "jsonwebtoken";

import { envs } from "@/config/envs";
import type { IUserRepository, UserEntity } from "@/domain/user";
import { Command } from "@/shared/utils/command";
import { NotFoundError, UnauthorizedError } from "@/shared/utils/errors";

type Params = {
  email: string;
  password: string;
};

type Result = {
  token: string;
};

export class LoginUserCommand extends Command {
  constructor(private readonly userRepository: IUserRepository) {
    super(LoginUserCommand.name);
  }

  public async execute(params: Params): Promise<Result> {
    try {
      this.logInitiated();

      const { user } = await this.getRelatedEntities(params);

      await this.guardAgainstInvalidPassword(params, user);

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

  private generateToken(user: UserEntity): string {
    const payload = user.toJson();

    return jwt.sign(payload, envs.JWT_SECRET);
  }

  private async getRelatedEntities(
    params: Params,
  ): Promise<{ user: UserEntity }> {
    const { email } = params;

    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new NotFoundError("User with provided email does not exist.");
    }

    return {
      user,
    };
  }

  private async guardAgainstInvalidPassword(
    params: Params,
    user: UserEntity,
  ): Promise<void> {
    const { password } = params;

    const isCorrectPassword = await user.comparePassword(password);

    if (!isCorrectPassword) {
      throw new UnauthorizedError("Incorrect password.");
    }
  }
}
