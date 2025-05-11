import { areIntervalsOverlapping } from "date-fns";
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
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    this.bookings.push(booking);

    return booking;
  }

  public async listByOfferId(
    offerId: string,
    opts?: { endDate: string; startDate: string },
  ): Promise<BookingEntity[]> {
    return this.bookings
      .filter((booking) => booking.offerId === offerId)
      .filter((booking) =>
        opts
          ? areIntervalsOverlapping(
              {
                end: opts.endDate,
                start: opts.startDate,
              },
              {
                end: booking.endDate,
                start: booking.startDate,
              },
            )
          : true,
      );
  }

  public async listByInterval(
    startDate: string,
    endDate: string,
  ): Promise<BookingEntity[]> {
    return this.bookings.filter((booking) =>
      areIntervalsOverlapping(
        {
          end: endDate,
          start: startDate,
        },
        {
          end: booking.endDate,
          start: booking.startDate,
        },
      ),
    );
  }

  public async listByUserId(userId: string): Promise<BookingEntity[]> {
    return this.bookings.filter((booking) => booking.userId === userId);
  }
}
