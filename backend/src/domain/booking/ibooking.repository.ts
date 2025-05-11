import type { BookingEntity } from "./booking.entity";
import type { BookingCreationAttributes } from "./booking.types";

export interface IBookingRepository {
  create(attributes: BookingCreationAttributes): Promise<BookingEntity>;
  listByOfferId(
    offerId: string,
    opts?: {
      endDate: string;
      startDate: string;
    },
  ): Promise<BookingEntity[]>;
  listByInterval(startDate: string, endDate: string): Promise<BookingEntity[]>;
  listByUserId(userId: string): Promise<BookingEntity[]>;
}
