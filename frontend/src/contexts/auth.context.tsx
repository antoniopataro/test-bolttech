import {
  createContext,
  useCallback,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";

import { UserEntity } from "@/entities/user.entity";
import type { LoginSchema } from "@/pages/login/login.schema";
import type { RegisterSchema } from "@/pages/register/register.schema";
import { userHelper } from "@/shared/helpers/user.helper";
import { useContextFactory } from "@/shared/utils/use-context.factory";

import { authService } from "./auth.service";

interface Actions {
  login: (data: LoginSchema) => Promise<boolean>;
  logout: () => Promise<void>;
  register: (data: RegisterSchema) => Promise<boolean>;
}

type State = {
  isAuthenticated: boolean;
  isLoadingLogin: boolean;
  isLoadingRegister: boolean;
  user: UserEntity | null;
};

const initialState: State = {
  isAuthenticated: !!userHelper.getUserFromLocalStorage(),
  isLoadingLogin: false,
  isLoadingRegister: false,
  user: null,
};

type ContextProps = Actions & State;

const AuthContext = createContext<ContextProps>({
  ...initialState,
} as ContextProps);

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [state, setState] = useState(initialState);

  const login = useCallback(async (data: LoginSchema) => {
    setState((prev) => ({
      ...prev,
      isLoadingLogin: true,
    }));

    const response = await authService.login(data);

    if (response.isFailure()) {
      setState((prev) => ({
        ...prev,
        isLoadingLogin: false,
      }));

      return false;
    }

    const { token } = response.data;

    userHelper.setAccessToken(token);
    const user = userHelper.getUserFromLocalStorage();

    if (!user) {
      throw new Error("User not found after login.");
    }

    setState((prev) => ({
      ...prev,
      isAuthenticated: true,
      isLoadingLogin: false,
      user: new UserEntity(user),
    }));

    return true;
  }, []);

  const logout = useCallback(async () => {
    setState((prev) => ({
      ...prev,
      isAuthenticated: false,
      user: null,
    }));

    userHelper.logout();
  }, []);

  const register = useCallback(async (data: RegisterSchema) => {
    setState((prev) => ({
      ...prev,
      isLoadingRegister: true,
    }));

    const response = await authService.register(data);

    if (response.isFailure()) {
      setState((prev) => ({
        ...prev,
        isLoadingRegister: false,
      }));

      return false;
    }

    const { token } = response.data;

    userHelper.setAccessToken(token);
    const user = userHelper.getUserFromLocalStorage();

    if (!user) {
      throw new Error("User not found after login.");
    }

    setState((prev) => ({
      ...prev,
      isAuthenticated: true,
      isLoadingRegister: false,
      user: new UserEntity(user),
    }));

    return true;
  }, []);

  useEffect(() => {
    const user = userHelper.getUserFromLocalStorage();

    if (!user) {
      return;
    }

    setState((prev) => ({
      ...prev,
      isAuthenticated: true,
      user: new UserEntity(user),
    }));
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContextFactory("AuthContext", AuthContext);
