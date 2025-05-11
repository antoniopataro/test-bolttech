import type { BookingEntity } from "./booking.entity";
import type { BookingCreationAttributes } from "./booking.types";

export interface IBookingRepository {
  create(attributes: BookingCreationAttributes): Promise<BookingEntity>;
  listByPeriod(params: {
    endDate: string;
    startDate: string;
  }): Promise<BookingEntity[]>;
  listByUserId(userId: string): Promise<BookingEntity[]>;
}
