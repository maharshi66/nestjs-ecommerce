import { Controller, Get } from '@nestjs/common';
import { CustomerServiceService } from './customer-service.service';

@Controller()
export class CustomerServiceController {
  constructor(private readonly customerServiceService: CustomerServiceService) {}

  @Get()
  getHello(): string {
    return this.customerServiceService.getHello();
  }
}
