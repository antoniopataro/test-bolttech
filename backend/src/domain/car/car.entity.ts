import { Seasons } from "@/shared/enums";

import type { SearchEntity, SearchSeasons } from "../search";

import type { CarAttributes, CarOffer } from "./car.types";

export class CarEntity {
  private readonly _id: string;
  private readonly _brand: string;
  private readonly _model: string;
  private readonly _priceMidSeason: number;
  private readonly _priceOffSeason: number;
  private readonly _pricePeakSeason: number;
  private readonly _stock: number;

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

  public isAvailable(): boolean {
    return this._stock > 0;
  }

  public getDailyPrice(searchSeasons: SearchSeasons): number {
    let price = 0;

    Object.entries(searchSeasons).forEach(([season, { days }]) => {
      switch (season) {
        case Seasons.MID:
          price += days * this._priceMidSeason;
          break;
        case Seasons.OFF:
          price += days * this._priceOffSeason;
          break;
        case Seasons.PEAK:
          price += days * this._pricePeakSeason;
          break;
        default:
          break;
      }
    });

    return price;
  }

  public toCarOffer(search: SearchEntity): CarOffer {
    const dailyPrice = this.getDailyPrice(search.calculateSeasons());

    return {
      brand: this._brand,
      id: this._id,
      model: this._model,
      pricing: {
        daily: Number((dailyPrice / search.calculateDays()).toFixed(2)),
        total: Number(dailyPrice.toFixed(2)),
      },
      stock: this._stock,
    };
  }
}
