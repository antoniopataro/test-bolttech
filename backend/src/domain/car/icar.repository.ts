import type { CarEntity } from "@/domain/car/car.entity";

export interface ICarRepository {
  decreaseStockAtomically(id: string): Promise<void>;
  findAll(): Promise<CarEntity[]>;
  findById(id: string): Promise<CarEntity | null>;
}
