import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { DatabaseModule } from '@app/common';
import { ReservationsController } from './reservations.controller';
import { ReservationsService } from './reservations.service';
import { ReservationsRepository } from './reservations.repository';
import {
  ReservationDocument,
  ReservationSchema,
} from './models/reservation.schema';

/**
 * Module for managing reservations.
 * Imports the DatabaseModule, configures the Reservation schema,
 * and provides the ReservationsController, ReservationsService, and ReservationRepository.
 */
@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([
      { name: ReservationDocument.name, schema: ReservationSchema },
    ]),
    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-pretty',
          options: {
            singleLine: true,
          },
        },
      },
    }),
  ],
  controllers: [ReservationsController],
  providers: [ReservationsService, ReservationsRepository],
})
export class ReservationsModule {}
