import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GlobalDomainModule } from './domain/order/domain.module';
import { OrderController } from './endpoints/order/order.controller';
import { GlobalDatabaseModule } from './infrastructure/database/database.module';

@Module({
  imports: [GlobalDatabaseModule, GlobalDomainModule],
  controllers: [AppController, OrderController],
  providers: [AppService],
})
export class AppModule {}
