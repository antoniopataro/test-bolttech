export type Car = {
  id: string;
  brand: string;
  model: string;
  pricing: CarPricing;
  stock: number;
};

type CarPricing = {
  daily: number;
  total: number;
};

export class CarEntity {
  private readonly _id: string;
  private readonly _brand: string;
  private readonly _model: string;
  private readonly _pricing: CarPricing;
  private readonly _stock: number;

  constructor(attributes: Car) {
    this._id = attributes.id;
    this._brand = attributes.brand;
    this._model = attributes.model;
    this._pricing = attributes.pricing;
    this._stock = attributes.stock;
  }

  public get id(): string {
    return this._id;
  }

  public get brand(): string {
    return this._brand;
  }

  public get model(): string {
    return this._model;
  }

  public get pricing(): CarPricing {
    return this._pricing;
  }

  public get stock(): number {
    return this._stock;
  }

  //

  public getDailyPricing(): number {
    return this._pricing.daily;
  }

  public getTotalPricing(): number {
    return this._pricing.total;
  }
}
