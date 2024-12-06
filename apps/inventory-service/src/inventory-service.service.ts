import { Injectable } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { MESSAGE_PATTERNS } from 'libs/common/constants/patterns';

@Injectable()
export class InventoryService {

  @MessagePattern(MESSAGE_PATTERNS.GET_INVENTORY_DETAILS)
  async getInventoryDetails(items: { productId: string, quantity: number }[]) {
    console.log('Inventory Service received request for:', items);

    // Mock response with predefined inventory details
    const inventoryResponse = items.map((item) => {
      const quantityAvailable = Math.floor(Math.random() * 1000) + 1;
      const unitPrice = Math.floor(Math.random() * 500) + 50; // Mock price between 50 and 500

      return {
        id: `${crypto.randomUUID()}`,
        name: `Mock Product ${item.productId}`,
        description: `Mock Description for product ${item.productId}`,
        quantity_available: quantityAvailable,
        requested_quantity: item.quantity,
        unit_price: unitPrice,
        total_price: unitPrice * item.quantity,
        is_available: quantityAvailable >= item.quantity,
      };
    });
    console.log('Inventory Service response:', inventoryResponse);

    return inventoryResponse;
  }
}
