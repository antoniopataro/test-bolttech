/* eslint-disable @typescript-eslint/no-explicit-any */

import { z } from "zod";

import { Validator } from "@/shared/utils/validator";

const validateCreateSearchSchema = z.object({
  endDate: z.string().min(1, "End date is required."),
  startDate: z.string().min(1, "Start date is required."),
});

const validateGetSearchSchema = z.object({
  searchId: z.string().min(1, "Id is required."),
});

export class SearchValidator extends Validator {
  public validateCreateSearch(
    data: any,
  ): z.infer<typeof validateCreateSearchSchema> {
    try {
      return validateCreateSearchSchema.parse(data);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  public validateGetSearch(data: any): z.infer<typeof validateGetSearchSchema> {
    try {
      return validateGetSearchSchema.parse(data);
    } catch (error) {
      throw this.handleError(error);
    }
  }
}
