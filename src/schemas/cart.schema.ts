import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type CartDocument = HydratedDocument<Cart>;

@Schema()
export class Cart {
  @Prop({ required: true})
  userID: mongoose.Types.ObjectId;

  @Prop({ required: true})
  productID: mongoose.Types.ObjectId;

  @Prop({ required: true})
  inventoryBatch: string;

  @Prop({ required: true})
  orderQty: number;

  @Prop({ required: true})
  orderTotalValue: number;

  @Prop({ required: true})
  orderTotalDisc: number;

  @Prop({ required: true})
  orderTotalFinalValue: number;

  @Prop({ required: true, type: Object })
  productSnapshot: Record<string, any>; // ProductSnapshot as flexible object

  @Prop({ required: false, default: new Date() })
  createdAt: Date;

  @Prop({ required: false, default: new Date() })
  updatedAt: Date;
}

export const CartSchema = SchemaFactory.createForClass(Cart);

CartSchema.index({ userID: 1 }, { unique: false });