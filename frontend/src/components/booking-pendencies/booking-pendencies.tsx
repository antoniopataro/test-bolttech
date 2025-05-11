import { useUser } from "@/contexts/user.context";
import { useBooking } from "@/pages/booking/booking.context";
import { bookingHelper } from "@/shared/helpers/booking.helper";

import { LicenseForm } from "../license-form/license-form";

import { components } from "./booking-pendencies.styles";

export const BookingPendencies: React.FC = () => {
  const { getBookingPendencies, pendencies } = useBooking();
  const { documents, isLoadingSaveLicense, saveDocument } = useUser();

  if (!pendencies || !bookingHelper.hasPendencies(pendencies)) {
    return null;
  }

  const license = documents?.find((document) => document.isLicense());

  return (
    <components.root>
      <components.info>
        But there are pendencies you need to solve first:
      </components.info>
      {pendencies.license ? (
        <LicenseForm
          defaultValues={license?.toLicenseSchema()}
          isLoading={isLoadingSaveLicense}
          message={pendencies.license}
          onSubmit={async (data) => {
            await saveDocument(data);

            await getBookingPendencies();
          }}
        />
      ) : null}
    </components.root>
  );
};
