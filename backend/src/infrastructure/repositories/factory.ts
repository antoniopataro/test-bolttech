import type { IBookingRepository } from "@/domain/booking";
import type { ICarRepository } from "@/domain/car";
import type { IDocumentRepository } from "@/domain/document";
import type { ISearchRepository } from "@/domain/search";
import type { IUserRepository } from "@/domain/user";

import {
  InMemoryBookingRepository,
  InMemoryCarRepository,
  InMemoryDocumentRepository,
  InMemorySearchRepository,
  InMemoryUserRepository,
} from "./in-memory";

export interface Repositories {
  bookingRepository: IBookingRepository;
  carRepository: ICarRepository;
  documentRepository: IDocumentRepository;
  searchRepository: ISearchRepository;
  userRepository: IUserRepository;
}

export class RepositoryFactory {
  public static create(): Repositories {
    return {
      bookingRepository: new InMemoryBookingRepository(),
      carRepository: new InMemoryCarRepository(),
      documentRepository: new InMemoryDocumentRepository(),
      searchRepository: new InMemorySearchRepository(),
      userRepository: new InMemoryUserRepository(),
    };
  }
}
