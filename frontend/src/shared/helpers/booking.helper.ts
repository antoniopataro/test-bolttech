import type { BookingPendencies } from "@/pages/booking/booking.types";

class BookingHelper {
  public hasPendencies(pendencies: BookingPendencies): boolean {
    return Object.values(pendencies).some((pendency) => pendency);
  }
}

export const bookingHelper = new BookingHelper();
