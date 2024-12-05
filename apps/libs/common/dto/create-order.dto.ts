import { Type } from 'class-transformer';
import { IsString, IsArray, ValidateNested, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateOrderDto {
    @IsString()
    @IsNotEmpty()
    customerId: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => OrderItemDto)
    items: OrderItemDto[];

    @IsString()
    @IsNotEmpty()
    shippingAddress: string;

    @IsString()
    @IsOptional()
    trackingInfo?: string;
}

export class OrderItemDto {
    @IsString()
    @IsNotEmpty()
    productId: string;

    @IsNotEmpty()
    quantity: number;
}