import { Injectable } from '@nestjs/common';

@Injectable()
export class InvoiceServiceService {
  getHello(): string {
    return 'Hello World!';
  }
}
