import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { BookingPendencies } from "@/components/booking-pendencies/booking-pendencies";
import { CarCard, CarCardSkeleton } from "@/components/car-card/car-card";
import { useSearch } from "@/contexts/search.context";
import { Button } from "@/ui/components/button/button";

import { BookingProvider, useBooking } from "./booking.context";
import { components } from "./booking.styles";

const Component: React.FC = () => {
  const {
    getBookingPendencies,
    getCarOffer,
    isLoading,
    isLoadingBookingPendencies,
    offer,
    pendencies,
  } = useBooking();
  const { getSearch, isLoadingSearch, search, searchId } = useSearch();

  useEffect(() => {
    void Promise.all([getCarOffer(), getBookingPendencies(), getSearch()]);
  }, [getBookingPendencies, getCarOffer, getSearch]);

  if (isLoading || isLoadingBookingPendencies || isLoadingSearch) {
    return (
      <components.root>
        <components.back to={`/search/${searchId}`}>↩ Back</components.back>
        <components.info>You're following with the booking of:</components.info>
        <CarCardSkeleton />
        <Button disabled>Confirm</Button>
      </components.root>
    );
  }

  if (!offer || !search) {
    return null;
  }

  const canProceed =
    pendencies && Object.values(pendencies).every((pendency) => !pendency);

  return (
    <components.root>
      <components.back to={`/search/${searchId}`}>↩ Back</components.back>
      <components.info>You're following with the booking of:</components.info>
      <CarCard car={offer} days={search.getDays()} />
      <BookingPendencies />
      <Button disabled={!canProceed}>Confirm</Button>
    </components.root>
  );
};

export const Booking: React.FC = () => {
  const { offerId, searchId } = useParams();

  if (!offerId || !searchId) {
    return null;
  }

  return (
    <BookingProvider offerId={offerId} searchId={searchId}>
      <Component />
    </BookingProvider>
  );
};
