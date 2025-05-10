/* eslint-disable @typescript-eslint/no-explicit-any */

import { z } from "zod";

import { DocumentType } from "@/shared/enums";
import { Validator } from "@/shared/utils/validator";

const validateLoginUserSchema = z.object({
  email: z
    .string({ message: "Missing email." })
    .min(1, "Invalid email length.")
    .email("Malformatted email."),
  password: z
    .string({ message: "Missing password." })
    .min(1, "Invalid password length."),
});

const validateRegisterUserSchema = validateLoginUserSchema;

const validateSaveDocumentSchema = z.object({
  expirationDate: z.string({ message: "Missing expiration date." }),
  type: z.nativeEnum(DocumentType, { message: "Missing document type." }),
});

export class UserValidator extends Validator {
  public validateLoginUser(data: any): z.infer<typeof validateLoginUserSchema> {
    try {
      return validateLoginUserSchema.parse(data);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  public validateRegisterUser(
    data: any,
  ): z.infer<typeof validateRegisterUserSchema> {
    try {
      return validateRegisterUserSchema.parse(data);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  public validateSaveDocument(
    data: any,
  ): z.infer<typeof validateSaveDocumentSchema> {
    try {
      return validateSaveDocumentSchema.parse(data);
    } catch (error) {
      throw this.handleError(error);
    }
  }
}
