import { Seasons } from "@/shared/enums";

import type { SearchSeasons } from "../search";

import type { CarAttributes, CarOffer } from "./car.types";

export class CarEntity {
  private readonly _id: string;
  private _brand: string;
  private _model: string;
  private _priceMidSeason: number;
  private _priceOffSeason: number;
  private _pricePeakSeason: number;
  private _stock: number;

  constructor(attributes: CarAttributes) {
    this._id = attributes.id;
    this._brand = attributes.brand;
    this._model = attributes.model;
    this._priceMidSeason = attributes.priceMidSeason;
    this._priceOffSeason = attributes.priceOffSeason;
    this._pricePeakSeason = attributes.pricePeakSeason;
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

  public get priceMidSeason(): number {
    return this._priceMidSeason;
  }

  public get priceOffSeason(): number {
    return this._priceOffSeason;
  }

  public get pricePeakSeason(): number {
    return this._pricePeakSeason;
  }

  public get stock(): number {
    return this._stock;
  }

  //

  public calculateStock(bookings: number): number {
    const remainingStock = this._stock - bookings;

    return Math.max(0, remainingStock);
  }

  private getSeasonPrice(season: Seasons, days: number): number {
    switch (season) {
      case Seasons.MID:
        return days * this._priceMidSeason;
      case Seasons.OFF:
        return days * this._priceOffSeason;
      case Seasons.PEAK:
        return days * this._pricePeakSeason;
      default:
        return 0;
    }
  }

  public getTotalPrice(searchSeasons: SearchSeasons): number {
    return Object.entries(searchSeasons).reduce((total, [season, { days }]) => {
      return total + this.getSeasonPrice(season as Seasons, days);
    }, 0);
  }

  public isAvailable(bookings: number): boolean {
    return this.calculateStock(bookings) > 0;
  }

  public toCarOffer(
    bookings: number,
    days: number,
    searchSeasons: SearchSeasons,
  ): CarOffer {
    const totalPrice = this.getTotalPrice(searchSeasons);

    return {
      brand: this._brand,
      id: this._id,
      model: this._model,
      pricing: {
        daily: Number((totalPrice / days).toFixed(2)),
        total: Number(totalPrice.toFixed(2)),
      },
      stock: this.calculateStock(bookings),
    };
  }
}
