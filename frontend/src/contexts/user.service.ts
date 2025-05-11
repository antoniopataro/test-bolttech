import type { LicenseFormSchema } from "@/components/license-form/license-form.schema";
import { DocumentEntity, type Document } from "@/entities/document.entity";
import type { LoginSchema } from "@/pages/login/login.schema";
import type { RegisterSchema } from "@/pages/register/register.schema";
import { api } from "@/shared/utils/api";
import type { Either } from "@/shared/utils/either";
import { failure, success } from "@/shared/utils/either";

export type ListDocumentsResponse = {
  documents: DocumentEntity[];
};

type LoginResponse = {
  token: string;
};

type RegisterResponse = {
  token: string;
};

export type SaveLicenseResponse = {
  document: DocumentEntity;
};

class UserService {
  public async listDocuments(): Promise<Either<Error, ListDocumentsResponse>> {
    try {
      const response = await api.get("/users/documents");

      return success({
        documents: response.data.documents.map(
          (document: Document) => new DocumentEntity(document),
        ),
      });
    } catch (error) {
      return failure(error as Error);
    }
  }

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

  public async saveDocument(
    data: LicenseFormSchema,
  ): Promise<Either<Error, SaveLicenseResponse>> {
    try {
      const response = await api.post("/users/documents", data);

      return success({
        document: new DocumentEntity(response.data.document),
      });
    } catch (error) {
      return failure(error as Error);
    }
  }
}

export const userService = new UserService();
