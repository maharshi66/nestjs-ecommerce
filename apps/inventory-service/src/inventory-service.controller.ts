import { Controller } from '@nestjs/common';
import { InventoryService } from './inventory-service.service';
import { MessagePattern } from '@nestjs/microservices';
import { MESSAGE_PATTERNS } from 'libs/common/constants/patterns';

@Controller()
export class InventoryServiceController {
  constructor(private readonly inventoryService: InventoryService) {}

  //*Respond to inventory requests - MOCKED
  @MessagePattern(MESSAGE_PATTERNS.GET_INVENTORY_DETAILS)
    async getInventoryDetails(items: { productId: string, quantity: number }[]) {
    return this.inventoryService.getInventoryDetails(items);
  }
}
