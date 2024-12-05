import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrderManagementService } from './order-management.service';
import { CreateOrderDto } from 'apps/libs/common/dto/create-order.dto';

@Controller('orders')
export class OrderManagementController {
  constructor(private readonly orderManagementService: OrderManagementService) {}

  @Post('')
  createOrder(@Body() createOrderDto: CreateOrderDto) {
    console.log('Received Order Creation request:', createOrderDto);
    return this.orderManagementService.createOrder(createOrderDto);
  }
}
