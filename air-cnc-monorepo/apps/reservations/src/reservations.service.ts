import { Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationsRepository } from './reservations.repository';

/**
 * Service for managing reservations.
 * Provides business logic for creating, retrieving, updating, and deleting reservations.
 */
@Injectable()
export class ReservationsService {
  constructor(
    private readonly reservationsRepository: ReservationsRepository,
  ) {}

  /**
   * Creates a new reservation.
   * @param createReservationDto Data for the new reservation.
   */
  create(createReservationDto: CreateReservationDto) {
    return this.reservationsRepository.create({
      ...createReservationDto,
      timestamp: new Date(),
      // TODO get from jwt
      userId: '123',
    });
  }

  /**
   * Retrieves all reservations.
   */
  findAll() {
    return this.reservationsRepository.find({});
  }

  /**
   * Retrieves a reservation by ID.
   * @param _id The ID of the reservation to retrieve.
   */
  findOne(_id: string) {
    return this.reservationsRepository.findOne({ _id });
  }

  /**
   * Updates an existing reservation.
   * @param _id The ID of the reservation to update.
   * @param updateReservationDto Updated data for the reservation.
   */
  update(_id: string, updateReservationDto: UpdateReservationDto) {
    return this.reservationsRepository.findOneAndUpdate(
      { _id },
      { $set: updateReservationDto },
    );
  }

  /**
   * Removes a reservation.
   * @param _id The ID of the reservation to remove.
   */
  remove(_id: string) {
    return this.reservationsRepository.findOneAndDelete({ _id });
  }
}
