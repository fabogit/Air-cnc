import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '@app/common/database/abstract.schema';

/**
 * Mongoose schema for the `Reservation` document.
 * Inherits from AbstractDocument and includes properties for reservation details.
 */
@Schema({ versionKey: false })
export class ReservationDocument extends AbstractDocument {
  /**
   * The timestamp of the reservation creation.
   */
  @Prop()
  timestamp: Date;

  /**
   * The start date of the reservation.
   */
  @Prop()
  startDate: Date;

  /**
   * The end date of the reservation.
   */
  @Prop()
  endDate: Date;

  /**
   * The ID of the user making the reservation.
   */
  @Prop()
  userId: string;

  /**
   * The ID of the place being reserved.
   */
  @Prop()
  placeId: string;

  /**
   * The ID of the invoice associated with the reservation.
   */
  @Prop()
  invoiceId: string;
}

/**
 * The compiled Mongoose schema for the `Reservation` document.
 */
export const ReservationSchema =
  SchemaFactory.createForClass(ReservationDocument);
