import { Exclude, Expose, Transform } from 'class-transformer';
import { Types } from 'mongoose';
import { OrderModel } from 'src/infrastructure/database/order/schema/order.schema';

@Exclude()
export class OrderDataObject {
  @Expose()
  @Transform(({ obj }: { obj: OrderModel }) => obj._id.toString(), {
    groups: ['db'],
  })
  @Transform(
    ({ obj }: { obj: OrderDataObject }) => new Types.ObjectId(obj.id),
    { groups: ['to-model'] },
  )
  id: string;

  @Expose()
  number: number;

  @Expose()
  totalPrice: number;

  @Expose()
  state: string;
}
