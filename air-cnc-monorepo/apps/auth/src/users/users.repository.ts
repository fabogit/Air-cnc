import { Injectable, Logger } from '@nestjs/common';
import { AbstractRepository } from '@app/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument } from './models/user.schema';
import { Model } from 'mongoose';

/**
 * Reservation repository implementation extending the `AbstractRepository`.
 * Provides CRUD operations specifically for `User` documents.
 */
@Injectable()
export class UsersRepository extends AbstractRepository<UserDocument> {
  protected readonly logger = new Logger(UsersRepository.name);

  constructor(@InjectModel(UserDocument.name) userModel: Model<UserDocument>) {
    super(userModel);
  }
}
