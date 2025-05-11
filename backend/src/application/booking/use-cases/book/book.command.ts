import { areIntervalsOverlapping } from "date-fns";

import type { BookingEntity, IBookingRepository } from "@/domain/booking";
import type { CarEntity, ICarRepository } from "@/domain/car";
import type { ISearchRepository, SearchEntity } from "@/domain/search";
import type { IUserRepository, UserEntity } from "@/domain/user";
import { Command } from "@/shared/utils/command";
import { ConflictError, NotFoundError } from "@/shared/utils/errors";

type Params = {
  offerId: string;
  searchId: string;
  userId: string;
};

type RelatedEntities = {
  bookings: BookingEntity[];
  car: CarEntity;
  search: SearchEntity;
  user: UserEntity;
};

type Result = {
  success: boolean;
};

export class BookCommand extends Command {
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

      const { bookings, car, search, user } =
        await this.getRelatedEntities(params);

      this.guardAgainstBookingsOverlap(bookings, search);
      this.guardAgainstUnavailableCar(car);

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
    const [bookings, car, search, user] = await Promise.all([
      this.bookingRepository.listByUserId(params.userId),
      this.carRepository.findById(params.offerId),
      this.searchRepository.findById(params.searchId),
      this.userRepository.findById(params.userId),
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

    return { bookings, car, search, user };
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
        throw new ConflictError("Bookings overlap.");
      }
    }
  }

  private guardAgainstUnavailableCar(car: CarEntity): void {
    if (car.stock === 0) {
      throw new ConflictError("Car is unavailable.");
    }
  }
}
