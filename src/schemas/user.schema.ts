import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true})
  name: string;

  @Prop({ required: true})
  email: string;

  @Prop({ required: true})
  password: string;

  @Prop({ default: 'User' })
  roles: [string];

  @Prop({ required: false, default: new Date() })
  createdAt: Date;

  @Prop({ required: false, default: new Date() })
  updatedAt: Date;

  @Prop({ index: true, default: false })
  isDeleted: Boolean;

  @Prop({ index: true, default: false })
  isActive: Boolean;

} 

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.index({ email: 1, roles: 1, isDeleted: 1 }, { unique: true });