import { Controller } from '@nestjs/common';
import { CustomerServiceService } from './customer-service.service';
import { MessagePattern } from '@nestjs/microservices';
import { MESSAGE_PATTERNS } from 'libs/common/constants/patterns';

@Controller()
export class CustomerServiceController {
  constructor(private readonly customerServiceService: CustomerServiceService,
  ) {}

  @MessagePattern(MESSAGE_PATTERNS.GET_CUSTOMER_DETAILS) //Respond to customer detail requests - MOCKED
  async getCustomerDetails(customerId: string) {
    return this.customerServiceService.getCustomerDetails(customerId);
  }
}
