import { Controller } from '@nestjs/common';
import { InventoryService } from './inventory-service.service';
import { MessagePattern } from '@nestjs/microservices';
import { MESSAGE_PATTERNS } from 'apps/libs/common/constants/patterns';

@Controller()
export class InventoryServiceController {
  constructor(private readonly inventoryService: InventoryService) {}

  //*Respond to inventory requests - MOCKED
  @MessagePattern(MESSAGE_PATTERNS.GET_INVENTORY_DETAILS)
    async getInventoryDetails(productIds: string[]) {
    return this.inventoryService.getInventoryDetails(productIds);
  }
}
