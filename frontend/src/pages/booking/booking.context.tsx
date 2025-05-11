import {
  createContext,
  useCallback,
  useState,
  type PropsWithChildren,
} from "react";
import toast from "react-hot-toast";

import type { CarEntity } from "@/entities/car.entity";
import { useContextFactory } from "@/shared/utils/use-context.factory";

import { bookingService } from "./booking.service";
import type { BookingPendencies } from "./booking.types";

type Actions = {
  book: () => Promise<{ success: boolean }>;
  getCarOffer: () => Promise<void>;
  getBookingPendencies: () => Promise<void>;
};

type Props = {
  offerId: string;
  searchId: string;
};

type State = {
  offer: CarEntity | null;
  isLoading: boolean;
  isLoadingBook: boolean;
  isLoadingBookingPendencies: boolean;
  pendencies: BookingPendencies | null;
};

const initialState: State = {
  offer: null,
  isLoading: false,
  isLoadingBook: false,
  isLoadingBookingPendencies: false,
  pendencies: null,
};

type ContextProps = Actions & Props & State;

const BookingContext = createContext<ContextProps>({
  ...initialState,
} as ContextProps);

export const BookingProvider: React.FC<PropsWithChildren<Props>> = ({
  children,
  offerId,
  searchId,
}) => {
  const [state, setState] = useState<State>(initialState);

  const book = useCallback(async () => {
    setState((prev) => ({
      ...prev,
      isLoadingBook: true,
    }));

    const response = await bookingService.book({
      offerId,
      searchId,
    });

    if (response.isFailure()) {
      const error = response.data;

      setState((prev) => ({
        ...prev,
        isLoadingBook: false,
      }));

      toast.error(error.message || "Failed to book.");

      return {
        success: false,
      };
    }

    setState((prev) => ({
      ...prev,
      isLoadingBook: false,
    }));

    toast.success("Booking successful.");

    return {
      success: true,
    };
  }, [offerId, searchId]);

  const getBookingPendencies = useCallback(async () => {
    setState((prev) => ({
      ...prev,
      isLoadingBookingPendencies: true,
    }));

    const response = await bookingService.getBookingPendencies(
      searchId,
      offerId,
    );

    if (response.isFailure()) {
      setState((prev) => ({
        ...prev,
        isLoadingBookingPendencies: false,
      }));

      toast.error("Failed to get booking pendencies.");

      return;
    }

    const { pendencies } = response.data;

    setState((prev) => ({
      ...prev,
      isLoadingBookingPendencies: false,
      pendencies,
    }));
  }, [offerId, searchId]);

  const getCarOffer = useCallback(async () => {
    setState((prev) => ({
      ...prev,
      isLoading: true,
    }));

    const response = await bookingService.getCarOffer(searchId, offerId);

    if (response.isFailure()) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
      }));

      toast.error("Failed to get car offer.");

      return;
    }

    const { car } = response.data;

    setState((prev) => ({
      ...prev,
      offer: car,
      isLoading: false,
    }));
  }, [offerId, searchId]);

  return (
    <BookingContext.Provider
      value={{
        ...state,
        book,
        getBookingPendencies,
        getCarOffer,
        offerId,
        searchId,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useBooking = () =>
  useContextFactory("BookingContext", BookingContext);
