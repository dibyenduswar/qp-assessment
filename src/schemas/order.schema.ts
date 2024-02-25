import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Cart } from './cart.schema';

export type OrderDocument = HydratedDocument<Order>;

@Schema()
export class Order {
  @Prop({ required: true})
  userID: mongoose.Types.ObjectId; 

  @Prop({ required: true})
  orderTotalValue: number;

  @Prop({ required: true})
  orderTotalDisc: number;

  @Prop({ required: true})
  orderTotalFinalValue: number;

  @Prop({ required: true, type: [Cart] })
  cart: Cart[];

  @Prop({ required: false, default: new Date() })
  createdAt: Date;

  @Prop({ required: false, default: new Date() })
  updatedAt: Date;

  @Prop({ required: true, default: 'Placed'}) // Placed/ Confirmed/ Shipped/ Delivered
  status: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);

OrderSchema.index({ userID: 1 }, { unique: false });