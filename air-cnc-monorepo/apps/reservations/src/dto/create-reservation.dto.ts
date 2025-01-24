export class CreateReservationDto {
  /**
   * The start date of the reservation.
   */
  startDate: Date;

  /**
   * The end date of the reservation.
   */
  endDate: Date;

  /**
   * The ID of the place being reserved.
   */
  placeId: string;

  /**
   * The ID of the invoice associated with the reservation.
   */
  invoiceId: string;
}
