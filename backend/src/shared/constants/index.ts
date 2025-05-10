import type { CarCreationAttributes } from "@/domain/car";

import { Seasons } from "../enums";

export const DEFAULT_CARS: CarCreationAttributes[] = [
  {
    brand: "Toyota",
    model: "Yaris",
    priceMidSeason: 76.89,
    priceOffSeason: 53.65,
    pricePeakSeason: 98.43,
    stock: 3,
  },
  {
    brand: "Seat",
    model: "Ibiza",
    priceMidSeason: 65.73,
    priceOffSeason: 46.85,
    pricePeakSeason: 85.12,
    stock: 5,
  },
  {
    brand: "Nissan",
    model: "Qashqai",
    priceMidSeason: 82.94,
    priceOffSeason: 59.87,
    pricePeakSeason: 101.46,
    stock: 2,
  },
  {
    brand: "Jaguar",
    model: "e-pace",
    priceMidSeason: 91.35,
    priceOffSeason: 70.27,
    pricePeakSeason: 120.54,
    stock: 1,
  },
  {
    brand: "Mercedes",
    model: "Vito",
    priceMidSeason: 89.64,
    priceOffSeason: 64.97,
    pricePeakSeason: 109.16,
    stock: 2,
  },
];

export const DEFAULT_SERVER_PORT = "8080";

export const DEFAULT_SEASON_INTERVALS = {
  [Seasons.MID]: [
    {
      end: "10-31",
      start: "09-15",
    },
    {
      end: "06-01",
      start: "03-01",
    },
  ],
  [Seasons.OFF]: [
    {
      end: "03-01",
      start: "11-01",
    },
  ],
  [Seasons.PEAK]: [
    {
      end: "09-15",
      start: "06-01",
    },
  ],
};
