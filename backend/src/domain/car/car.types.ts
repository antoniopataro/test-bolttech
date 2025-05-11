export type CarAttributes = {
  id: string;
  brand: string;
  model: string;
  priceMidSeason: number;
  priceOffSeason: number;
  pricePeakSeason: number;
  stock: number;
};

export type CarCreationAttributes = Omit<CarAttributes, "id">;

export type Car = {
  id: string;
  brand: string;
  model: string;
  priceMidSeason: number;
  priceOffSeason: number;
  pricePeakSeason: number;
  stock: number;
};

export type CarOffer = {
  id: string;
  brand: string;
  model: string;
  pricing: {
    daily: number;
    total: number;
  };
  stock: number;
};
