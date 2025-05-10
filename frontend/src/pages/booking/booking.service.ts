import type { LicenseFormSchema } from "@/components/license-form/license-form.schema";
import { CarEntity } from "@/entities/car.entity";
import { DocumentEntity } from "@/entities/document.entity";
import { api } from "@/shared/utils/api";
import type { Either } from "@/shared/utils/either";
import { failure, success } from "@/shared/utils/either";

import type { BookingPendencies } from "./booking.types";

export type BookRequest = {
  offerId: string;
  searchId: string;
};

export type BookResponse = {
  success: boolean;
};

export type GetCarOfferResponse = {
  car: CarEntity;
};

export type GetBookingPendenciesResponse = {
  pendencies: BookingPendencies;
};

export type SaveLicenseResponse = {
  license: DocumentEntity;
};

class BookingService {
  public async book(data: BookRequest): Promise<Either<Error, BookResponse>> {
    try {
      const response = await api.post("/bookings", data);

      return success(response.data);
    } catch (error) {
      return failure(error as Error);
    }
  }

  public async getCarOffer(
    searchId: string,
    offerId: string,
  ): Promise<Either<Error, GetCarOfferResponse>> {
    try {
      const response = await api.get(`searches/${searchId}/offers/${offerId}`);

      return success({
        car: new CarEntity(response.data.car),
      });
    } catch (error) {
      return failure(error as Error);
    }
  }

  public async getBookingPendencies(
    searchId: string,
    offerId: string,
  ): Promise<Either<Error, GetBookingPendenciesResponse>> {
    try {
      const response = await api.get(
        `searches/${searchId}/offers/${offerId}/pendencies`,
      );

      return success(response.data);
    } catch (error) {
      return failure(error as Error);
    }
  }

  public async saveLicense(
    data: LicenseFormSchema,
  ): Promise<Either<Error, SaveLicenseResponse>> {
    try {
      const response = await api.post("/users/documents", data);

      return success({
        license: new DocumentEntity(response.data.license),
      });
    } catch (error) {
      return failure(error as Error);
    }
  }
}

export const bookingService = new BookingService();
