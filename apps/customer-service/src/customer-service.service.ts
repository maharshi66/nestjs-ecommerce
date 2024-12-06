import { Injectable } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { MESSAGE_PATTERNS } from 'libs/common/constants/patterns';
@Injectable()
export class CustomerServiceService {
  @MessagePattern(MESSAGE_PATTERNS.GET_CUSTOMER_DETAILS) // Respond to customer detail requests
  async getCustomerDetails(customerId: string) {
    console.log('Customer Service received request for:', customerId);

    // Mock response with predefined customer details
    return {
      id: customerId,
      name: 'Mock Customer',
      email: 'mock.customer@example.com',
      phone: '+123456789',
      shipping_address: '1234 Mock St, Mock City, Mock Country',
    };
  }
}
