import { Injectable } from '@nestjs/common';

@Injectable()
export class CustomerServiceService {
  getHello(): string {
    return 'Hello World!';
  }
}
