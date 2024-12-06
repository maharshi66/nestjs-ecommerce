import { IsNotEmpty, IsUUID } from 'class-validator';

export class OrderIdDto {
    @IsUUID()
    @IsNotEmpty()
    orderId: string;
}