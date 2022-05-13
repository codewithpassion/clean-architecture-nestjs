import { UpdateQuery } from 'mongoose';
import { OrderDataObject } from './order.data-object';

export const IOrderRepository = Symbol('IOrderRepository');
export interface IOrderRepository {
  findAll(): Promise<OrderDataObject[]>;
  findOne(id: string): Promise<OrderDataObject>;
  findByIdAndUpdate(
    id: string,
    updateData: UpdateQuery<OrderDataObject>,
  ): Promise<OrderDataObject>;

  create(newOrder: OrderDataObject): Promise<OrderDataObject>;
}
