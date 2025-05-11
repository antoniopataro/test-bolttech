import type { CarEntity } from "@/domain/car/car.entity";

import type { CarCreationAttributes } from "./car.types";

export interface ICarRepository {
  create(car: CarCreationAttributes): Promise<CarEntity>;
  findById(id: string): Promise<CarEntity | null>;
  listAll(): Promise<CarEntity[]>;
}
