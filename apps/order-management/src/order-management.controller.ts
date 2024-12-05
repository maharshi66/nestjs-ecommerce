// import { Controller, Post, Body, Put, Param, Delete } from '@nestjs/common';
// import { OrderManagementService } from './order-management.service';
// import { CreateOrderDto } from './dto/create-order.dto';
// import { UpdateOrderDto } from './dto/update-order.dto';
// import { Get } from '@nestjs/common';

// @Controller('orders')
// export class OrderManagementController {
//   constructor(private readonly OrderManagementService: OrderManagementService) {}

//   @Get()
//   getAllOrders() {
//     return this.OrderManagementService.getAllOrders();
//   }

//   @Post()
//   createOrder(@Body() createOrderDto: CreateOrderDto) {
//     return this.OrderManagementService.createOrder(createOrderDto);
//   }

//   @Put(':id')
//   updateOrder(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
//     return this.OrderManagementService.updateOrder(id, updateOrderDto);
//   }

//   @Delete(':id')
//   deleteOrder(@Param('id') id: string) {
//     return this.OrderManagementService.deleteOrder(id);
//   }
// }

import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { OrderManagementService } from './order-management.service';

@Controller()
export class OrderManagementController {
  constructor(private readonly orderManagementService: OrderManagementService) {}

  @EventPattern({ cmd: 'order.create' })
  handleOrderPlaced() {
    console.log('Order placed request received');
    return this.orderManagementService.handleOrderPlaced('');
  }
}
