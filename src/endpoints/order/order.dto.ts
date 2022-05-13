import { Exclude, Expose, Transform } from 'class-transformer';
import { OrderEntity } from 'src/domain/order/order.entity';

@Exclude()
export class OrderDto {
  @Expose()
  id: string;

  @Expose()
  number: number;

  @Expose()
  state: string;

  @Expose()
  totalPrice: number;

  @Expose()
  @Transform(
    ({ obj }: { obj: OrderEntity }) => `$${obj.totalPrice.toFixed(2)}`,
    { groups: ['to-dto'] },
  )
  totalPriceFormatted: string;
}

export class CreateOrderDto {
  number: number;
  totalPrice: number;
}
