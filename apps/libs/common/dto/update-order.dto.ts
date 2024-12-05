import { IsString, IsUrl } from 'class-validator';

export class UpdateTrackingInfoDto {
  @IsString()
  orderId: string;

  @IsString()
  trackingNumber: string;

  @IsString()
  carrier: string;

  @IsUrl()
  trackingUrl: string;
}

export class UpdateOrderStatusDto {
  @IsString()
  orderId: string;

  @IsString()
  orderStatus: string;
}