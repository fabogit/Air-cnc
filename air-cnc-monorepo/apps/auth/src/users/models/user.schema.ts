import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '@app/common/database/abstract.schema';

/**
 * Mongoose schema for the `User` document.
 * Inherits from AbstractDocument and includes properties for user details.
 */
@Schema({ versionKey: false })
export class UserDocument extends AbstractDocument {
  /**
   * User email
   */
  @Prop()
  email: string;

  /**
   * The user password
   */
  @Prop()
  password: string;
}

/**
 * The compiled Mongoose schema for the `User` document.
 */
export const UserSchema = SchemaFactory.createForClass(UserDocument);
