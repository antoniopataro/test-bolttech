import { useBooking } from "@/pages/booking/booking.context";

import { LicenseForm } from "../license-form/license-form";

export const BookingPendencies: React.FC = () => {
  const {
    getBookingPendencies,
    isLoadingSaveLicense,
    pendencies,
    saveLicense,
  } = useBooking();

  if (!pendencies) {
    return null;
  }

  return (
    <>
      {pendencies.license ? (
        <LicenseForm
          isLoading={isLoadingSaveLicense}
          onSubmit={async (data) => {
            await saveLicense(data);

            await getBookingPendencies();
          }}
        />
      ) : null}
    </>
  );
};
