import { Injectable } from '@nestjs/common';

@Injectable()
export class OrderManagementService {
  getHello(): string {
    return 'Hello World!';
  }
}
