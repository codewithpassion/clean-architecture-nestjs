import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema()
export class OrderModel {
  _id: Types.ObjectId;

  @Prop({ required: true })
  number: number;

  @Prop({ required: true })
  totalPrice: number;

  @Prop({ required: true })
  state: string;
}

export type OrderDocument = OrderModel & Document;
export const OrderSchema = SchemaFactory.createForClass(OrderModel);
