import { Schema, Prop } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';

/**
 * Abstract base class for Mongoose documents.
 * Provides a common `_id` property of type ObjectId.
 */
@Schema()
export class AbstractDocument {
  /**
   * The unique identifier for the document.
   */
  @Prop({ type: SchemaTypes.ObjectId })
  _id: Types.ObjectId;
}
