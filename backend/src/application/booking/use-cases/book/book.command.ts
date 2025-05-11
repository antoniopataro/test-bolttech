import { areIntervalsOverlapping } from "date-fns";

import type { BookingEntity, IBookingRepository } from "@/domain/booking";
import type { CarEntity, ICarRepository } from "@/domain/car";
import type { ISearchRepository, SearchEntity } from "@/domain/search";
import type { IUserRepository, UserEntity } from "@/domain/user";
import { Command } from "@/shared/utils/command";
import { ConflictError, NotFoundError } from "@/shared/utils/errors";

import type { BookCommandParams } from "./book.command.types";

type Params = BookCommandParams;

type RelatedEntities = {
  car: CarEntity;
  carBookings: BookingEntity[];
  search: SearchEntity;
  user: UserEntity;
  userBookings: BookingEntity[];
};

type Result = {
  success: boolean;
};

export class BookCommand extends Command {
  public static readonly ERRORS = {
    BOOKINGS_OVERLAP: "Booking overlap detected.",
    CAR_UNAVAILABLE: "Car is unavailable.",
  };

  constructor(
    private readonly bookingRepository: IBookingRepository,
    private readonly carRepository: ICarRepository,
    private readonly searchRepository: ISearchRepository,
    private readonly userRepository: IUserRepository,
  ) {
    super(BookCommand.name);
  }

  public async execute(params: Params): Promise<Result> {
    try {
      this.logInitiated();

      const { car, carBookings, search, user, userBookings } =
        await this.getRelatedEntities(params);

      this.guardAgainstBookingsOverlap(userBookings, search);
      this.guardAgainstUnavailableCar(car, carBookings);

      await this.bookingRepository.create({
        offerId: car.id,
        searchId: search.id,
        userId: user.id,
        endDate: search.endDate,
        startDate: search.startDate,
      });

      this.logFinished();

      return {
        success: true,
      };
    } catch (error) {
      this.logFailed();

      throw error;
    }
  }

  private async getRelatedEntities(params: Params): Promise<RelatedEntities> {
    const { offerId, searchId, userId } = params;

    const [car, carBookings, search, user, userBookings] = await Promise.all([
      this.carRepository.findById(offerId),
      this.bookingRepository.listByOfferId(offerId),
      this.searchRepository.findById(searchId),
      this.userRepository.findById(userId),
      this.bookingRepository.listByUserId(userId),
    ]);

    if (!car) {
      throw new NotFoundError("Car not found.");
    }
    if (!search) {
      throw new NotFoundError("Search not found.");
    }
    if (!user) {
      throw new NotFoundError("User not found.");
    }

    return { car, carBookings, search, user, userBookings };
  }

  private guardAgainstBookingsOverlap(
    bookings: BookingEntity[],
    search: SearchEntity,
  ): void {
    const newBookingInterval = {
      end: search.endDate,
      start: search.startDate,
    };

    for (const booking of bookings) {
      const existingBookingInterval = {
        end: booking.endDate,
        start: booking.startDate,
      };

      if (
        areIntervalsOverlapping(newBookingInterval, existingBookingInterval)
      ) {
        throw new ConflictError(BookCommand.ERRORS.BOOKINGS_OVERLAP);
      }
    }
  }

  private guardAgainstUnavailableCar(
    car: CarEntity,
    carBookings: BookingEntity[],
  ): void {
    if (!car.isAvailable(carBookings.length)) {
      throw new ConflictError(BookCommand.ERRORS.CAR_UNAVAILABLE);
    }
  }
}
