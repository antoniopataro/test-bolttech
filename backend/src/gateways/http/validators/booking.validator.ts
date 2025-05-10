/* eslint-disable @typescript-eslint/no-explicit-any */

import { z } from "zod";

import { Validator } from "@/shared/utils/validator";

const validateGetBookingPendenciesSchema = z.object({
  offerId: z.string().min(1, "Offer identification is required."),
  searchId: z.string().min(1, "Search identification is required."),
});

export class BookingValidator extends Validator {
  public validateGetBookingPendencies(
    data: any,
  ): z.infer<typeof validateGetBookingPendenciesSchema> {
    try {
      return validateGetBookingPendenciesSchema.parse(data);
    } catch (error) {
      throw this.handleError(error);
    }
  }
}
