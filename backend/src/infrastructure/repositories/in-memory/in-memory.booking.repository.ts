import { v4 as uuidv4 } from "uuid";

import { BookingEntity } from "@/domain/booking";
import type {
  IBookingRepository,
  BookingCreationAttributes,
} from "@/domain/booking";

export class InMemoryBookingRepository implements IBookingRepository {
  private bookings: BookingEntity[] = [];

  //

  public async create(
    attributes: BookingCreationAttributes,
  ): Promise<BookingEntity> {
    const booking = new BookingEntity({
      ...attributes,
      id: uuidv4(),
    });

    this.bookings.push(booking);

    return booking;
  }

  public async listByUserId(userId: string): Promise<BookingEntity[]> {
    return this.bookings.filter((booking) => booking.userId === userId);
  }
}
