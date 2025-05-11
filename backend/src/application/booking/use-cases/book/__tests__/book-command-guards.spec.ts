import type { CarCreationAttributes, CarEntity } from "@/domain/car";
import type { SearchEntity } from "@/domain/search";
import type { UserEntity } from "@/domain/user";
import {
  InMemoryBookingRepository,
  InMemoryCarRepository,
  InMemorySearchRepository,
  InMemoryUserRepository,
} from "@/infrastructure/repositories/in-memory";

import { BookCommand } from "../book.command";
import type { BookCommandParams } from "../book.command.types";

export const carStub: CarCreationAttributes = {
  brand: "",
  model: "",
  priceMidSeason: 0,
  priceOffSeason: 0,
  pricePeakSeason: 0,
  stock: 1,
};

jest.mock("@/shared/utils/logger", () => ({
  logger: {
    error: jest.fn(),
    info: jest.fn(),
  },
}));

const makeParams = (
  car: CarEntity,
  search: SearchEntity,
  user: UserEntity,
): BookCommandParams => ({
  offerId: car.id,
  searchId: search.id,
  userId: user.id,
});

describe("book-command-guards", () => {
  let bookingRepository: InMemoryBookingRepository;
  let carRepository: InMemoryCarRepository;
  let searchRepository: InMemorySearchRepository;
  let userRepository: InMemoryUserRepository;

  let user: UserEntity;

  beforeEach(async () => {
    bookingRepository = new InMemoryBookingRepository();
    carRepository = new InMemoryCarRepository();
    searchRepository = new InMemorySearchRepository();
    userRepository = new InMemoryUserRepository();

    user = await userRepository.create({
      email: "test@test.com",
      password: "test",
    });
  });

  describe("it should guard against a user having multiple bookings on the same date", () => {
    let car: CarEntity;

    let initialSearch: SearchEntity;

    beforeEach(async () => {
      car = await carRepository.create(carStub);

      initialSearch = await searchRepository.create({
        endDate: "2025-01-14",
        startDate: "2025-01-07",
        userId: user.id,
      });

      await bookingRepository.create({
        endDate: initialSearch.endDate,
        startDate: initialSearch.startDate,
        offerId: car.id,
        searchId: initialSearch.id,
        userId: user.id,
      });
    });

    it("when the dates are exactly the same", async () => {
      const overlappingSearch = await searchRepository.create({
        endDate: "2025-01-14",
        startDate: "2025-01-07",
        userId: user.id,
      });

      const params = makeParams(car, overlappingSearch, user);

      const sut = new BookCommand(
        bookingRepository,
        carRepository,
        searchRepository,
        userRepository,
      );

      await expect(sut.execute(params)).rejects.toThrow(
        BookCommand.ERRORS.BOOKINGS_OVERLAP,
      );
    });

    it("when the end date conflicts with an existing booking", async () => {
      const overlappingSearch = await searchRepository.create({
        endDate: "2025-01-08",
        startDate: "2025-01-01",
        userId: user.id,
      });

      const params = makeParams(car, overlappingSearch, user);

      const sut = new BookCommand(
        bookingRepository,
        carRepository,
        searchRepository,
        userRepository,
      );

      await expect(sut.execute(params)).rejects.toThrow(
        BookCommand.ERRORS.BOOKINGS_OVERLAP,
      );
    });

    it("when the start date conflicts with an existing booking", async () => {
      const overlappingSearch = await searchRepository.create({
        endDate: "2025-01-21",
        startDate: "2025-01-13",
        userId: user.id,
      });

      const params = makeParams(car, overlappingSearch, user);

      const sut = new BookCommand(
        bookingRepository,
        carRepository,
        searchRepository,
        userRepository,
      );

      await expect(sut.execute(params)).rejects.toThrow(
        BookCommand.ERRORS.BOOKINGS_OVERLAP,
      );
    });
  });

  describe("it should guard against a car being out of stock", () => {
    it("when the default stock is zero", async () => {
      const car = await carRepository.create({ ...carStub, stock: 0 });

      const search = await searchRepository.create({
        endDate: "2025-01-14",
        startDate: "2025-01-07",
        userId: user.id,
      });

      const params = makeParams(car, search, user);

      const sut = new BookCommand(
        bookingRepository,
        carRepository,
        searchRepository,
        userRepository,
      );

      await expect(sut.execute(params)).rejects.toThrow(
        BookCommand.ERRORS.CAR_UNAVAILABLE,
      );
    });

    it("when the stock gets depleted", async () => {
      const car = await carRepository.create(carStub);

      const user1 = await userRepository.create({
        email: "test1@test.com",
        password: "test",
      });
      const search1 = await searchRepository.create({
        endDate: "2025-01-14",
        startDate: "2025-01-07",
        userId: user1.id,
      });

      const user2 = await userRepository.create({
        email: "test2@test.com",
        password: "test",
      });
      const search2 = await searchRepository.create({
        endDate: "2025-01-14",
        startDate: "2025-01-07",
        userId: user2.id,
      });

      const params1 = makeParams(car, search1, user1);
      const params2 = makeParams(car, search2, user2);

      const sut = new BookCommand(
        bookingRepository,
        carRepository,
        searchRepository,
        userRepository,
      );

      await sut.execute(params1);

      await expect(sut.execute(params2)).rejects.toThrow(
        BookCommand.ERRORS.CAR_UNAVAILABLE,
      );
    });
  });
});
