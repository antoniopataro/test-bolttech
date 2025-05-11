/* eslint-disable @typescript-eslint/no-explicit-any */

import { z } from "zod";

import { Validator } from "@/shared/utils/validator";

const validateGetCarOfferSchema = z.object({
  offerId: z.string().min(1, "Offer identification is required."),
  searchId: z.string().min(1, "Search identification is required."),
});

const validateListCarOffersSchema = z.object({
  searchId: z.string().min(1, "Search identification is required."),
});

export class OfferValidator extends Validator {
  public validateGetCarOffer(
    data: any,
  ): z.infer<typeof validateGetCarOfferSchema> {
    try {
      return validateGetCarOfferSchema.parse(data);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  public validateListCarOffers(
    data: any,
  ): z.infer<typeof validateListCarOffersSchema> {
    try {
      return validateListCarOffersSchema.parse(data);
    } catch (error) {
      throw this.handleError(error);
    }
  }
}
