import { InjectModel } from '@nestjs/mongoose';
import { IOrderRepository } from 'src/interfaces/database/order/IOrderRepository';
import { OrderDataObject } from 'src/interfaces/database/order/order.data-object';
import { Model, Types, UpdateQuery } from 'mongoose';
import { OrderDocument, OrderModel } from './schema/order.schema';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OrderRepository implements IOrderRepository {
  constructor(
    @InjectModel('Order') private readonly DbModel: Model<OrderDocument>,
  ) {}

  findOne(id: string): Promise<OrderDataObject> {
    return this.DbModel.findById(new Types.ObjectId(id))
      .lean<OrderModel>()
      .exec()
      .then((model) => this.toDataObject(model));
  }

  findAll(): Promise<OrderDataObject[]> {
    return this.DbModel.find({})
      .lean<OrderModel[]>()
      .exec()
      .then((models) => {
        return models.map((model) => this.toDataObject(model));
      });
  }

  findByIdAndUpdate(
    id: string,
    updateData: UpdateQuery<OrderDataObject>,
  ): Promise<OrderDataObject> {
    return this.DbModel.findByIdAndUpdate(id, updateData)
      .lean<OrderModel>()
      .exec()
      .then(async (updated) => {
        if (updated) {
          return this.toDataObject(updated);
        } else {
          throw new Error(`No order with id ${id} found to update.`);
        }
      });
  }

  create(newOrder: OrderDataObject): Promise<OrderDataObject> {
    const newModel = new this.DbModel(this.toModelObject(newOrder));
    return newModel.save().then((model) => this.toDataObject(model.toObject()));
  }

  private toDataObject(dbObject: OrderModel): OrderDataObject {
    const res = plainToInstance(OrderDataObject, dbObject, { groups: ['db'] });
    return res;
  }

  private toModelObject(dataObject: OrderDataObject): OrderModel {
    const plain = instanceToPlain(dataObject, { groups: ['to-model'] });
    return plainToInstance(OrderModel, plain);
  }
}
