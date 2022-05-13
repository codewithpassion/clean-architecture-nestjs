import { DynamicModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { IOrderRepository } from 'src/interfaces/database/order/IOrderRepository';
import { GlobalMongooseModule } from './globalMongoose.module';
import { OrderRepository } from './order/order.repository';
import { OrderSchema } from './order/schema/order.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/example'),
    GlobalMongooseModule.forFeature([{ name: 'Order', schema: OrderSchema }]),
  ],
  providers: [{ provide: IOrderRepository, useClass: OrderRepository }],
  exports: [
    { provide: IOrderRepository, useClass: OrderRepository, global: true },
  ],
})
export class DatabaseModule {}

export const GlobalDatabaseModule: DynamicModule = {
  module: DatabaseModule,
  global: true,
};
