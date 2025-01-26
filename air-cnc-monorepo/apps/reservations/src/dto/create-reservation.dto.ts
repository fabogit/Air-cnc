import { IsDate, IsNotEmpty, IsString } from 'class-validator';
import { Type } from 'class-transformer';

/**
 * Data Transfer Object (DTO) for creating a new reservation.
 * This DTO is used to validate and transfer data from the client
 * when creating a new reservation in the system.
 * @property startDate: The start date of the reservation.
 * @property endDate: The end date of the reservation.
 * @property placeId: The ID of the place being reserved.
 * @property invoiceId: The ID of the associated invoice.
 */
export class CreateReservationDto {
  /**
   * The start date of the reservation. Must be a valid date.
   * @example 2024-07-20T10:00:00.000Z
   */
  @IsDate()
  @Type(() => Date)
  startDate: Date;

  /**
   * The end date of the reservation. Must be a valid date and occur after the start date.
   * @example 2024-07-27T10:00:00.000Z
   */
  @IsDate()
  @Type(() => Date)
  endDate: Date;

  /**
   * The unique identifier of the place being reserved.
   * This should correspond to a valid Place entity in the database.
   * @example "67932140909b3c6fc5ebb545"
   */
  @IsString()
  @IsNotEmpty()
  placeId: string;

  /**
   * The unique identifier of the invoice associated with this reservation.
   * This should correspond to a valid Invoice entity in the system.
   * @example "67931bbe5826336e1e85536f"
   */
  @IsString()
  @IsNotEmpty()
  invoiceId: string;
}
