import { Controller } from '@nestjs/common';
import { CustomerServiceService } from './customer-service.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class CustomerServiceController {
  constructor(private readonly customerServiceService: CustomerServiceService,
  ) {}
  @MessagePattern('customer.get') //Respond to customer detail requests - MOCKED
  async getCustomerDetails(customerId: string) {
    return this.customerServiceService.getCustomerDetails(customerId);
  }
}
