import { v4 as uuidv4 } from "uuid";

import type { CarCreationAttributes } from "@/domain/car";
import { CarEntity } from "@/domain/car";
import { type ICarRepository } from "@/domain/car";
import { DEFAULT_CARS } from "@/shared/constants";

export class InMemoryCarRepository implements ICarRepository {
  private cars: CarEntity[] = [];

  constructor() {
    this.seed();
  }

  private seed(): void {
    this.cars = DEFAULT_CARS.map(
      (car) =>
        new CarEntity({
          ...car,
          id: uuidv4(),
        }),
    );
  }

  //

  public async create(data: CarCreationAttributes): Promise<CarEntity> {
    const car = new CarEntity({
      ...data,
      id: uuidv4(),
    });
    this.cars.push(car);

    return car;
  }

  public async findById(id: string): Promise<CarEntity | null> {
    const car = this.cars.find((car) => car.id === id);

    if (!car) {
      return null;
    }

    return car;
  }

  public async listAll(): Promise<CarEntity[]> {
    return this.cars;
  }
}
