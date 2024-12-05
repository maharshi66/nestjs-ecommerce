import { Injectable } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
@Injectable()
export class CustomerServiceService {
  @MessagePattern('get.customer') // Respond to customer detail requests
  async getCustomerDetails(customerId: string) {
    console.log('Customer Service received request for:', customerId);

    // Mock response with predefined customer details
    return {
      id: customerId,
      name: 'Mock Customer',
      email: 'mock.customer@example.com',
      phone: '+123456789',
    };
  }
}
