import { Controller, Get } from '@nestjs/common';
import { OrderManagementService } from './order-management.service';

@Controller()
export class OrderManagementController {
  constructor(private readonly orderManagementService: OrderManagementService) {}

  @Get()
  getHello(): string {
    return this.orderManagementService.getHello();
  }
}
