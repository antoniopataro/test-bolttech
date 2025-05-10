import { z } from "zod";

import { DocumentType } from "@/shared/enums";

export const licenseFormSchema = z.object({
  expirationDate: z.date({
    required_error: "License expiration date is required.",
    invalid_type_error: "License expiration date must be a valid date.",
  }),
  type: z.nativeEnum(DocumentType, {
    required_error: "Document type is required.",
    invalid_type_error: "Document type must be a valid document type.",
  }),
});

export type LicenseFormSchema = z.infer<typeof licenseFormSchema>;
