import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Inventory {
  @Prop({ required: true})
  batchNo: string;

  @Prop({ required: true})
  availableQty: number;

  @Prop({ required: true})
  stockQty: number;

  @Prop({ required: true})
  expiry: string;

  @Prop({ required: false, default: new Date() })
  createdAt: Date;

  @Prop({ required: false, default: new Date() })
  updatedAt: Date;

  @Prop({ index: true, default: false })
  isDeleted: Boolean;

  @Prop({ index: true, default: false })
  isActive: Boolean;

  @Prop({ required: true})
  priceListing: number

  @Prop({ required: true})
  priceListingDisc: number

  @Prop({ required: true})
  priceListingEffective: number
}

export const InventorySchema = SchemaFactory.createForClass(Inventory);

@Schema()
export class Product {
  // @Prop()
  // id: string;

  @Prop({ required: true, index: true, sparse: true })
  name: string;

  @Prop({ required: true, index: true, sparse: true })
  brand: string;

  @Prop({ required: true })
  make: string;

  @Prop()
  model: string;

  @Prop({ required: true })
  unitQuantity: number;

  @Prop({ required: true, default: 1 })
  minOrderQuantity: number;

  @Prop({ required: true, default: 5 })
  maxOrderQuantity: number;

  @Prop({ index: true })
  usedFor: [string];

  @Prop({ index: true, default: false })
  isActive: Boolean;

  @Prop({ index: true, default: false })
  isDeleted: Boolean;

  @Prop({ required: false, default: new Date() })
  createdAt: Date;

  @Prop({ required: false, default: new Date() })
  updatedAt: Date;

  @Prop({ type: InventorySchema }) 
  inventories: [Inventory]
}
 

export const ProductSchema = SchemaFactory.createForClass(Product);

ProductSchema.index({ name: 1, isDeleted: 1 }, { unique: true });