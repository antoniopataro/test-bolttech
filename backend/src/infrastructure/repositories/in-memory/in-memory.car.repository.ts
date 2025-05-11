import { v4 as uuidv4 } from "uuid";

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

  public async listAll(): Promise<CarEntity[]> {
    return this.cars;
  }

  public async findById(id: string): Promise<CarEntity | null> {
    const car = this.cars.find((car) => car.id === id);

    if (!car) {
      return null;
    }

    return car;
  }

  private async save(car: CarEntity): Promise<void> {
    const index = this.cars.findIndex((c) => c.id === car.id);

    if (index === -1) {
      this.cars.push(car);
    } else {
      this.cars[index] = car;
    }
  }
}
