import { Controller, Get, Put, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrderManagementService } from './order-management.service';
import { CreateOrderDto } from 'apps/libs/common/dto/create-order.dto';
import { UpdateOrderDto } from 'apps/libs/common/dto/update-order.dto';

@Controller('orders')
export class OrderManagementController {
  constructor(private readonly orderManagementService: OrderManagementService) {}

  @Post('')
  createOrder(@Body() createOrderDto: CreateOrderDto) {
    console.log('Received Order Creation request:', createOrderDto);
    return this.orderManagementService.createOrder(createOrderDto, 'mockToken');
  }

  @Put(':id')
  updateOrder(@Param('id') orderId: string, @Body() updateOrderDto: UpdateOrderDto) {
    console.log('Received Order Update request for ID:', orderId);
    return this.orderManagementService.updateOrder(orderId, updateOrderDto, 'mockToken');
  }

  @Delete(':id')
  deleteOrder(@Param('id') orderId: string) {
    console.log('Received Order Delete request for ID:', orderId);
    return this.orderManagementService.deleteOrder(orderId, 'mockToken');
  }
}
