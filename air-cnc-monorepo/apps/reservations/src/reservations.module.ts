import { Module } from '@nestjs/common';
import { DatabaseModule } from '@app/common';
import { LoggerModule } from '@app/common';
import { ReservationsController } from './reservations.controller';
import { ReservationsService } from './reservations.service';
import { ReservationsRepository } from './reservations.repository';
import {
  ReservationDocument,
  ReservationSchema,
} from './models/reservation.schema';

/**
 * Module for managing reservation-related functionality.
 * This module imports the `DatabaseModule` (providing general database access)
 * and configures a feature module for the reservation collection using the `Reservation` schema.
 * It also imports the `LoggerModule` and provides the `ReservationsController`, `ReservationsService`,
 * and `ReservationsRepository` for reservation management operations.
 */
@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([
      { name: ReservationDocument.name, schema: ReservationSchema },
    ]),
    LoggerModule,
  ],
  controllers: [ReservationsController],
  providers: [ReservationsService, ReservationsRepository],
})
export class ReservationsModule {}
