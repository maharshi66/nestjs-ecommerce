import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class OrderIdDto {
    @IsString()
    @IsNotEmpty()
    orderId: string;
}