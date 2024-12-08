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
import { CreateOrderDto } from 'libs/common/dto/create-order.dto';
import { UpdateOrderDto } from 'libs/common/dto/update-order.dto';
import { lastValueFrom } from 'rxjs';

@Controller('orders')
export class OrderManagementController {
  constructor(private readonly orderManagementService: OrderManagementService) {}

  @Get('health-check')
  healthCheck() {
    console.log('Received Health Check request');
    return { status: 'success', message: 'Health-Check Successful', data: null };
  }

  @Get()
  async getAllOrders() {
    console.log('Received Order Fetch request');
    try {
      const orders = await lastValueFrom(this.orderManagementService.getAllOrders('mockToken'));
      console.log('Orders:', orders);
      return { status: 'success', message: 'Orders fetched successfully', data: orders };
    } catch (error) {
      console.error('Error fetching orders:', error.message);
      const errorMessage = error?.message || 'An unknown error occurred';
      throw new HttpException(
        {
          status: 'error',
          message: errorMessage,
          data: null,
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get(':id')
  async getOrderById(@Param('id') orderId: string) {
    console.log('Received Order Fetch request for ID:', orderId);
    try {
      const order = await lastValueFrom(
        this.orderManagementService.getOrderById(orderId, 'mockToken')
      );
      return { status: 'success', message: 'Order fetched successfully', data: order };
    } catch (error) {
      console.error('Error fetching order:', error.message);
      const errorMessage = error?.message || 'An unknown error occurred';
      throw new HttpException(
        {
          status: 'error',
          message: errorMessage,
          data: null,
        },
        HttpStatus.NOT_FOUND
      );
    }
  }

  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    console.log('Received Order Creation request:', createOrderDto);
    try {
      this.orderManagementService.createOrder(createOrderDto, 'mockToken');
      return { status: 'success', message: 'Order created successfully', data: null};
    } catch (error) {
      console.error('Error creating order:', error.message);
      const errorMessage = error?.message || 'An unknown error occurred';
      throw new HttpException(
        {
          status: 'error',
          message: errorMessage,
          data: null,
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Put(':id')
  async updateOrder(@Param('id') orderId: string, @Body() updateOrderDto: UpdateOrderDto) {
    console.log('Received Order Update request for ID:', orderId);
    try {
      const order = await lastValueFrom(this.orderManagementService.updateOrder(orderId, updateOrderDto, 'mockToken'));
      return { status: 'success', message: 'Order updated successfully', data: order };
    } catch (error) {
      console.error('Error updating order:', error.message);
      const errorMessage = error?.message || 'An unknown error occurred';
      throw new HttpException(
        {
          status: 'error',
          message: errorMessage,
          data: null,
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Delete(':id')
  async deleteOrder(@Param('id') orderId: string) {
    console.log('Received Order Delete request for ID:', orderId);
    try {
      const order = await lastValueFrom(this.orderManagementService.deleteOrder(orderId, 'mockToken'));
      return { status: 'success', message: 'Order deleted successfully', data: order };
    } catch (error) {
      console.error('Error deleting order:', error.message);
      const errorMessage = error?.message || 'An unknown error occurred';
      throw new HttpException(
        {
          status: 'error',
          message: errorMessage,
          data: null,
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
