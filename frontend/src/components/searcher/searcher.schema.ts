import { z } from "zod";

export const searcherSchema = z
  .object({
    endDate: z.date({
      required_error: "Drop-off date is required.",
      invalid_type_error: "Drop-off date must be a valid date.",
    }),
    startDate: z.date({
      required_error: "Pick-up date is required.",
      invalid_type_error: "Pick-up date must be a valid date.",
    }),
  })
  .refine((data) => data.endDate > data.startDate, {
    message: "Drop-off date must be greater than pick-up date.",
    path: ["endDate"],
  });

export type SearcherSchema = z.infer<typeof searcherSchema>;
