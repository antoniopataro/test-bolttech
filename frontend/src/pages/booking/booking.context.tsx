import {
  createContext,
  useCallback,
  useState,
  type PropsWithChildren,
} from "react";

import type { LicenseFormSchema } from "@/components/license-form/license-form.schema";
import type { CarEntity } from "@/entities/car.entity";
import { useContextFactory } from "@/shared/utils/use-context.factory";

import { bookingService } from "./booking.service";
import type { BookingPendencies } from "./booking.types";

type Actions = {
  getCarOffer: () => Promise<void>;
  getBookingPendencies: () => Promise<void>;
  saveLicense: (data: LicenseFormSchema) => Promise<void>;
};

type Props = {
  offerId: string;
  searchId: string;
};

type State = {
  offer: CarEntity | null;
  isLoading: boolean;
  isLoadingBookingPendencies: boolean;
  isLoadingSaveLicense: boolean;
  pendencies: BookingPendencies | null;
};

const initialState: State = {
  offer: null,
  isLoading: false,
  isLoadingBookingPendencies: false,
  isLoadingSaveLicense: false,
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

      return;
    }

    const { car } = response.data;

    setState((prev) => ({
      ...prev,
      offer: car,
      isLoading: false,
    }));
  }, [offerId, searchId]);

  const saveLicense = useCallback(async (data: LicenseFormSchema) => {
    setState((prev) => ({
      ...prev,
      isLoadingSaveLicense: true,
    }));

    const response = await bookingService.saveLicense(data);

    if (response.isFailure()) {
      setState((prev) => ({
        ...prev,
        isLoadingSaveLicense: false,
      }));

      return;
    }

    setState((prev) => ({
      ...prev,
      isLoadingSaveLicense: false,
    }));
  }, []);

  return (
    <BookingContext.Provider
      value={{
        ...state,
        getBookingPendencies,
        getCarOffer,
        offerId,
        searchId,
        saveLicense,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useBooking = () =>
  useContextFactory("BookingContext", BookingContext);
