import type { CarEntity } from "@/domain/car/car.entity";

export interface ICarRepository {
  findById(id: string): Promise<CarEntity | null>;
  listAll(): Promise<CarEntity[]>;
}
