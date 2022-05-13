import { DynamicModule, Module } from '@nestjs/common';
import { OrderService } from './order.service';

@Module({
  providers: [OrderService],
  exports: [OrderService],
})
export class DomainModule {}
export const GlobalDomainModule: DynamicModule = {
  module: DomainModule,
  global: true,
};
