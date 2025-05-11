import type { BookingEntity, IBookingRepository } from "@/domain/booking";
import type { CarEntity, CarOffer, ICarRepository } from "@/domain/car";
import type { ISearchRepository, SearchEntity } from "@/domain/search";
import { Command } from "@/shared/utils/command";
import { NotFoundError } from "@/shared/utils/errors";

type Params = {
  searchId: string;
};

type RelatedEntities = {
  bookings: BookingEntity[];
  cars: CarEntity[];
  search: SearchEntity;
};

type Result = {
  cars: CarOffer[];
};

export class ListCarOffersCommand extends Command {
  constructor(
    private readonly bookingRepository: IBookingRepository,
    private readonly carRepository: ICarRepository,
    private readonly searchRepository: ISearchRepository,
  ) {
    super(ListCarOffersCommand.name);
  }

  public async execute(params: Params): Promise<Result> {
    try {
      this.logInitiated();

      const { bookings, cars, search } = await this.getRelatedEntities(params);

      const bookingsByOfferId = this.buildBookingsByOfferId(bookings, cars);

      this.logFinished();

      const availableCars = cars.filter((car) =>
        car.isAvailable(bookingsByOfferId[car.id].length),
      );

      const carOffers = availableCars.map((car) =>
        car.toCarOffer(
          bookingsByOfferId[car.id].length,
          search.calculateDays(),
          search.calculateSeasons(),
        ),
      );

      return {
        cars: carOffers,
      };
    } catch (error) {
      this.logFailed();

      throw error;
    }
  }

  private buildBookingsByOfferId(
    bookings: BookingEntity[],
    cars: CarEntity[],
  ): Record<string, BookingEntity[]> {
    return cars.reduce(
      (prev, car) => {
        return {
          ...prev,
          [car.id]: bookings.filter((booking) => booking.offerId === car.id),
        };
      },
      {} as Record<string, BookingEntity[]>,
    );
  }

  private async getRelatedEntities(params: Params): Promise<RelatedEntities> {
    const { searchId } = params;

    const [cars, search] = await Promise.all([
      this.carRepository.listAll(),
      this.searchRepository.findById(searchId),
    ]);

    if (!search) {
      throw new NotFoundError("Search not found.");
    }

    const bookings = await this.bookingRepository.listByInterval(
      search.startDate,
      search.endDate,
    );

    return {
      bookings,
      cars,
      search,
    };
  }
}
