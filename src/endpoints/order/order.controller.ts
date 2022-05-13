import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { OrderService } from 'src/domain/order/order.service';
import { CreateOrderDto, OrderDto } from './order.dto';

@Controller('order')
@ApiTags('Order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  async findAll(): Promise<OrderDto> {
    return plainToInstance(OrderDto, this.orderService.findAll(), {
      groups: ['to-dto'],
    });
  }

  @Post()
  async create(@Body() newOrder: CreateOrderDto): Promise<OrderDto> {
    return plainToInstance(OrderDto, this.orderService.create(newOrder), {
      groups: ['to-dto'],
      excludeExtraneousValues: true,
    });
  }
}
