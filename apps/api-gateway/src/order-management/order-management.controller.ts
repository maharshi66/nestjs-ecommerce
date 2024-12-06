import {
  Controller,
  Get,
  Put,
  Post,
  Body,
  Param,
  Delete,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { OrderManagementService } from './order-management.service';
import { CreateOrderDto } from 'apps/libs/common/dto/create-order.dto';
import { UpdateOrderDto } from 'apps/libs/common/dto/update-order.dto';
import { lastValueFrom } from 'rxjs';
import { OrderIdDto } from 'apps/libs/common/dto/order-id.dto';

@Controller('orders')
export class OrderManagementController {
  constructor(private readonly orderManagementService: OrderManagementService) {}

  @Get('health-check')
  healthCheck() {
    console.log('Received Health Check request');
    return { message: 'Health-Check Successful' };
  }

  @Get()
  async getAllOrders() {
    console.log('Received Order Fetch request');
    try {
      const orders = await lastValueFrom(this.orderManagementService.getAllOrders('mockToken'));
      console.log('Orders:', orders);
      return orders;
    } catch (error) {
      console.error('Error fetching orders:', error.message);
      const errorMessage = error?.message || 'An unknown error occurred';
      throw new HttpException(
        {
          status: 'error',
          message: errorMessage,
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get(':id')
  async getOrderById(@Param('id') orderId: OrderIdDto) {
    console.log('Received Order Fetch request for ID:', orderId);
    try {
      const order = await lastValueFrom(
        this.orderManagementService.getOrderById(orderId, 'mockToken')
      );
      return order;
    } catch (error) {
      console.error('Error fetching order:', error.message);
      const errorMessage = error?.message || 'An unknown error occurred';
      throw new HttpException(
        {
          status: 'error',
          message: errorMessage,
        },
        HttpStatus.NOT_FOUND
      );
    }
  }

  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    console.log('Received Order Creation request:', createOrderDto);
    try {
      await this.orderManagementService.createOrder(createOrderDto, 'mockToken');
      return { message: 'Order created successfully' };
    } catch (error) {
      console.error('Error creating order:', error.message);
      const errorMessage = error?.message || 'An unknown error occurred';
      throw new HttpException(
        {
          status: 'error',
          message: errorMessage,
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Put(':id')
  async updateOrder(
    @Param('id') orderId: OrderIdDto,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    console.log('Received Order Update request for ID:', orderId);
    try {
      const res = lastValueFrom(this.orderManagementService.updateOrder(orderId, updateOrderDto, 'mockToken'));
      return res;
    } catch (error) {
      console.error('Error updating order:', error.message);
      const errorMessage = error?.message || 'An unknown error occurred';
      throw new HttpException(
        {
          status: 'error',
          message: errorMessage,
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Delete(':id')
  async deleteOrder(@Param('id') orderId: OrderIdDto) {
    console.log('Received Order Delete request for ID:', orderId);
    try {
      const order = await lastValueFrom(this.orderManagementService.deleteOrder(orderId, 'mockToken'));
      console.log(order)
      return order;
    } catch (error) {
      console.error('Error deleting order:', error.message);
      const errorMessage = error?.message || 'An unknown error occurred';
      throw new HttpException(
        {
          status: 'error',
          message: errorMessage,
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
