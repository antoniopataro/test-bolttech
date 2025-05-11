import { useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { BookingPendencies } from "@/components/booking-pendencies/booking-pendencies";
import { CarCard, CarCardSkeleton } from "@/components/car-card/car-card";
import { useSearch } from "@/contexts/search.context";
import { bookingHelper } from "@/shared/helpers/booking.helper";
import { Button } from "@/ui/components/button/button";

import { BookingProvider, useBooking } from "./booking.context";
import { components } from "./booking.styles";

const Component: React.FC = () => {
  const navigate = useNavigate();

  const {
    book,
    getBookingPendencies,
    getCarOffer,
    isLoading,
    isLoadingBook,
    isLoadingBookingPendencies,
    offer,
    pendencies,
  } = useBooking();
  const { getSearch, isLoadingSearch, search, searchId } = useSearch();

  const handleBook = useCallback(async () => {
    const { success } = await book();

    if (!success) {
      return;
    }

    navigate("/");
  }, [book, navigate]);

  useEffect(() => {
    void Promise.all([getCarOffer(), getBookingPendencies(), getSearch()]);
  }, [getBookingPendencies, getCarOffer, getSearch]);

  if (isLoading || isLoadingBookingPendencies || isLoadingSearch) {
    return (
      <components.root>
        <components.back to={`/search/${searchId}`}>↩ Back</components.back>
        <components.info>You're following with the booking of:</components.info>
        <CarCardSkeleton />
        <Button disabled icon="credit-card">
          Confirm
        </Button>
      </components.root>
    );
  }

  if (!offer || !search) {
    return (
      <components.root>
        <components.empty.paragraph>
          <components.empty.text>
            Failed to load booking.{" "}
          </components.empty.text>
          <components.empty.link to="/">Go back</components.empty.link>
        </components.empty.paragraph>
      </components.root>
    );
  }

  const canBook = !!pendencies && !bookingHelper.hasPendencies(pendencies);

  return (
    <components.root>
      <components.back to={`/search/${searchId}`}>↩ Back</components.back>
      <components.info>You're following with the booking of:</components.info>
      <CarCard car={offer} days={search.getDays()} />
      <BookingPendencies />
      <Button
        disabled={!canBook}
        icon="credit-card"
        loading={isLoadingBook}
        onClick={async () => {
          await handleBook();
        }}
      >
        Confirm
      </Button>
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
