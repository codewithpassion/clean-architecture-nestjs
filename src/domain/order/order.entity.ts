import { IOrderRepository } from 'src/interfaces/database/order/IOrderRepository';
import { OrderDataObject } from 'src/interfaces/database/order/order.data-object';

export class OrderEntity {
  constructor(
    private readonly orderRepository: IOrderRepository,
    private model: OrderDataObject,
  ) {}

  get id() {
    return this.model.id;
  }

  get number() {
    return this.model.number;
  }

  get totalPrice() {
    return this.model.totalPrice;
  }

  get state() {
    return this.model.state;
  }

  async markAsDelivered() {
    this.model = await this.orderRepository.findByIdAndUpdate(this.id, {
      state: 'delivered',
    });
  }
}
