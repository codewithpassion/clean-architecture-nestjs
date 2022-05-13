import { Inject, Injectable } from '@nestjs/common';
import { IOrderRepository } from 'src/interfaces/database/order/IOrderRepository';
import { OrderDataObject } from 'src/interfaces/database/order/order.data-object';
import { OrderEntity } from './order.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class OrderService {
  constructor(
    @Inject(IOrderRepository)
    private readonly orderRepository: IOrderRepository,
  ) {}

  async findById(id: string): Promise<OrderEntity> {
    const model = await this.orderRepository.findOne(id);
    return this.toEntity([model])[0];
  }

  async findAll(): Promise<OrderEntity[]> {
    const res = this.toEntity(await this.orderRepository.findAll());
    return res;
  }

  async create(data: { number: number; totalPrice: number }) {
    const newOrder = await this.orderRepository.create({
      ...data,
      id: uuid(),
      state: 'created',
    });
    return this.toEntity([newOrder])[0];
  }

  private toEntity(orders: OrderDataObject[]) {
    return orders.map((order) => {
      return new OrderEntity(this.orderRepository, order);
    });
  }
}
