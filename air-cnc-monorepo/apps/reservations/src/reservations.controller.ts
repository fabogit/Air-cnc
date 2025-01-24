import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';

/**
 * Controller for managing reservations.
 * Handles creating, retrieving, updating, and deleting reservations.
 * @controller reservations
 */
@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  /**
   * Creates a new reservation.
   * @param createReservationDto Data for the new reservation.
   */
  @Post()
  create(@Body() createReservationDto: CreateReservationDto) {
    return this.reservationsService.create(createReservationDto);
  }

  /**
   * Retrieves all reservations.
   */
  @Get()
  findAll() {
    return this.reservationsService.findAll();
  }

  /**
   * Retrieves a reservation by ID.
   * @param id The ID of the reservation to retrieve.
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reservationsService.findOne(id);
  }

  /**
   * Updates an existing reservation.
   * @param id The ID of the reservation to update.
   * @param updateReservationDto Updated data for the reservation.
   */
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateReservationDto: UpdateReservationDto,
  ) {
    return this.reservationsService.update(id, updateReservationDto);
  }

  /**
   * Removes a reservation.
   * @param id The ID of the reservation to remove.
   */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reservationsService.remove(id);
  }
}
