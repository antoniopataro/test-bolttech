import { jwtDecode } from "jwt-decode";

import type { User, UserFromAccessToken } from "@/entities/user.entity";

class UserHelper {
  private clearAccessToken(): void {
    localStorage.removeItem("access_token");
  }

  private getAccessToken(): string | null {
    return localStorage.getItem("access_token");
  }

  public logout(): void {
    this.clearAccessToken();
  }

  public getUserFromLocalStorage(): User | null {
    const accessToken = this.getAccessToken();

    if (!accessToken) {
      return null;
    }

    const jwtData = jwtDecode<UserFromAccessToken>(accessToken);

    const userFromAccessToken: UserFromAccessToken = {
      createdAt: jwtData.createdAt,
      email: jwtData.email,
      id: jwtData.id,
      updatedAt: jwtData.updatedAt,
    };

    const user: User = {
      createdAt: userFromAccessToken.createdAt,
      email: userFromAccessToken.email,
      id: userFromAccessToken.id,
      updatedAt: userFromAccessToken.updatedAt,
    };

    return user;
  }

  public setAccessToken(token: string): void {
    localStorage.setItem("access_token", token);
  }
}

export const userHelper = new UserHelper();
