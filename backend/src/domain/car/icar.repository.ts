import type { CarEntity } from "@/domain/car/car.entity";

export interface ICarRepository {
  findAll(): Promise<CarEntity[]>;
  findById(id: string): Promise<CarEntity | null>;
}
