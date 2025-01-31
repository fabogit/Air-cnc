import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '@app/common';
import { LoggerModule } from '@app/common';
import { ReservationsController } from './reservations.controller';
import { ReservationsService } from './reservations.service';
import { ReservationsRepository } from './reservations.repository';
import {
  ReservationDocument,
  ReservationSchema,
} from './models/reservation.schema';
import { validateReservationsEnv } from './reservations.env-validation';

/**
 * Module for managing reservation-related functionality.
 *
 * This module imports the following:
 * - `DatabaseModule`: Provides general database access functionality.
 * - `DatabaseModule.forFeature`: Configures a feature module for the reservation collection using the provided schema.
 * - `LoggerModule`: Provides logging functionality.
 * - `ReservationsController`: Handles reservation-related API requests.
 * - `ReservationsService`: Provides business logic for reservation operations.
 * - `ReservationsRepository`: Handles data persistence for reservations in the database.
 *
 * The `ConfigModule.forRoot` import with the `validateReservationsEnv` function ensures that the reservation environment variables are validated during application startup.
 */
@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([
      { name: ReservationDocument.name, schema: ReservationSchema },
    ]),
    LoggerModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validate: validateReservationsEnv,
    }),
  ],
  controllers: [ReservationsController],
  providers: [ReservationsService, ReservationsRepository],
})
export class ReservationsModule {}
