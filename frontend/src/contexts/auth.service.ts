import type { LoginSchema } from "@/pages/login/login.schema";
import type { RegisterSchema } from "@/pages/register/register.schema";
import { api } from "@/shared/utils/api";
import type { Either } from "@/shared/utils/either";
import { failure, success } from "@/shared/utils/either";

type LoginResponse = {
  token: string;
};

type RegisterResponse = {
  token: string;
};

class AuthService {
  public async login(data: LoginSchema): Promise<Either<Error, LoginResponse>> {
    try {
      const response = await api.post("/users/login", data);

      return success({
        token: response.data.token,
      });
    } catch (error) {
      return failure(error as Error);
    }
  }

  public async register(
    data: RegisterSchema,
  ): Promise<Either<Error, RegisterResponse>> {
    try {
      const response = await api.post("/users/register", data);

      return success({
        token: response.data.token,
      });
    } catch (error) {
      return failure(error as Error);
    }
  }
}

export const authService = new AuthService();
