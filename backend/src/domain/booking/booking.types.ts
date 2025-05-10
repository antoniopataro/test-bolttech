export type BookingAttributes = {
  id: string;
  offerId: string;
  searchId: string;
  userId: string;
  endDate: string;
  startDate: string;
  createdAt: string;
  updatedAt: string;
};

export type BookingCreationAttributes = {
  offerId: string;
  searchId: string;
  userId: string;
  endDate: string;
  startDate: string;
};

export type Booking = {
  id: string;
  offerId: string;
  searchId: string;
  userId: string;
  endDate: string;
  startDate: string;
  createdAt: string;
  updatedAt: string;
};
