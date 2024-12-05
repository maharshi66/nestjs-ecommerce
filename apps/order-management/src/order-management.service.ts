import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { MESSAGE_PATTERNS } from 'apps/libs/common/constants/patterns';
import { CUSTOMER_SERVICE, INVENTORY_SERVICE } from 'apps/libs/common/constants/services';
import { CreateOrderDto } from 'apps/libs/common/dto/create-order.dto';

@Injectable()
export class OrderManagementService {
  constructor(@Inject(CUSTOMER_SERVICE) private readonly customerClient: ClientProxy, @Inject(INVENTORY_SERVICE) private readonly inventoryClient: ClientProxy) {}

  async handleOrderPlaced(order: CreateOrderDto) {
    console.log(`Received a new order - customer: ${order}`);

    const customerDetails = await this.customerClient.send(MESSAGE_PATTERNS.GET_CUSTOMER_DETAILS, 'CUST01').toPromise();
    console.log('Customer details:', customerDetails);

    const inventoryDetails = await this.inventoryClient.send(MESSAGE_PATTERNS.GET_INVENTORY_DETAILS, 'INV01').toPromise();
    console.log('Inventory details:', inventoryDetails);
  }
}
