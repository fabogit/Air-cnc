import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ModelDefinition, MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '../config/config.module';

/**
 * Module for configuring and establishing the MongoDB connection.
 * Imports the ConfigModule and uses it to retrieve the MongoDB URI.
 * Provides a static `forFeature` method to register Mongoose models.
 */
@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {
  /**
   * Registers Mongoose models for use within this module.
   * This is a wrapper around MongooseModule.forFeature.
   * @param models An array of ModelDefinition objects.
   * @returns A dynamic module containing the registered models.
   */
  static forFeature(models: ModelDefinition[]) {
    return MongooseModule.forFeature(models);
  }
}
