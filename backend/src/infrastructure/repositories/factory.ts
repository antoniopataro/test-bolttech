import type { ICarRepository } from "@/domain/car";
import type { IDocumentRepository } from "@/domain/document";
import type { ISearchRepository } from "@/domain/search";
import type { IUserRepository } from "@/domain/user";

import {
  InMemoryCarRepository,
  InMemoryDocumentRepository,
  InMemorySearchRepository,
  InMemoryUserRepository,
} from "./in-memory";

export interface Repositories {
  carRepository: ICarRepository;
  documentRepository: IDocumentRepository;
  searchRepository: ISearchRepository;
  userRepository: IUserRepository;
}

export class RepositoryFactory {
  public static create(): Repositories {
    return {
      carRepository: new InMemoryCarRepository(),
      documentRepository: new InMemoryDocumentRepository(),
      searchRepository: new InMemorySearchRepository(),
      userRepository: new InMemoryUserRepository(),
    };
  }
}
