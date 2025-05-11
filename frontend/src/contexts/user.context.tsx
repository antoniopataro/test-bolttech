import {
  createContext,
  useCallback,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";
import toast from "react-hot-toast";

import type { LicenseFormSchema } from "@/components/license-form/license-form.schema";
import type { DocumentEntity } from "@/entities/document.entity";
import { UserEntity } from "@/entities/user.entity";
import type { LoginSchema } from "@/pages/login/login.schema";
import type { RegisterSchema } from "@/pages/register/register.schema";
import { userHelper } from "@/shared/helpers/user.helper";
import { useContextFactory } from "@/shared/utils/use-context.factory";

import { userService } from "./user.service";

interface Actions {
  listDocuments: () => Promise<void>;
  login: (data: LoginSchema) => Promise<boolean>;
  logout: () => Promise<void>;
  register: (data: RegisterSchema) => Promise<boolean>;
  saveDocument: (data: LicenseFormSchema) => Promise<void>;
}

type State = {
  documents: DocumentEntity[] | null;
  isAuthenticated: boolean;
  isLoadingDocuments: boolean;
  isLoadingSaveLicense: boolean;
  isLoadingLogin: boolean;
  isLoadingRegister: boolean;
  user: UserEntity | null;
};

const initialState: State = {
  documents: null,
  isAuthenticated: !!userHelper.getUserFromLocalStorage(),
  isLoadingDocuments: false,
  isLoadingSaveLicense: false,
  isLoadingLogin: false,
  isLoadingRegister: false,
  user: null,
};

type ContextProps = Actions & State;

const UserContext = createContext<ContextProps>({
  ...initialState,
} as ContextProps);

export const UserProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [state, setState] = useState(initialState);

  const listDocuments = useCallback(async () => {
    setState((prev) => ({
      ...prev,
      isLoadingDocuments: true,
    }));

    const response = await userService.listDocuments();

    if (response.isFailure()) {
      setState((prev) => ({
        ...prev,
        isLoadingDocuments: false,
      }));

      toast.error("Failed to list documents.");

      return;
    }

    const { documents } = response.data;

    setState((prev) => ({
      ...prev,
      documents,
      isLoadingDocuments: false,
    }));
  }, []);

  const login = useCallback(async (data: LoginSchema) => {
    setState((prev) => ({
      ...prev,
      isLoadingLogin: true,
    }));

    const response = await userService.login(data);

    if (response.isFailure()) {
      setState((prev) => ({
        ...prev,
        isLoadingLogin: false,
      }));

      toast.error("Failed to login.");

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
      documents: null,
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

    const response = await userService.register(data);

    if (response.isFailure()) {
      setState((prev) => ({
        ...prev,
        isLoadingRegister: false,
      }));

      toast.error("Failed to register.");

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

  const saveDocument = useCallback(async (data: LicenseFormSchema) => {
    setState((prev) => ({
      ...prev,
      isLoadingSaveLicense: true,
    }));

    const response = await userService.saveDocument(data);

    if (response.isFailure()) {
      setState((prev) => ({
        ...prev,
        isLoadingSaveLicense: false,
      }));

      toast.error("Failed to save document.");

      return;
    }

    const { document } = response.data;

    setState((prev) => ({
      ...prev,
      documents: prev.documents?.find((d) => d.id === document.id)
        ? prev.documents?.map((d) => (d.id === document.id ? document : d))
        : [...(prev.documents || []), document],
      isLoadingSaveLicense: false,
    }));
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

    void listDocuments();
  }, [listDocuments]);

  return (
    <UserContext.Provider
      value={{
        ...state,
        listDocuments,
        login,
        logout,
        register,
        saveDocument,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useUser = () => useContextFactory("UserContext", UserContext);
