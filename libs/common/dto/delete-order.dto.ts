import { IsNotEmpty, IsString } from "class-validator";

export class DeleteOrderDto {
    @IsString()
    @IsNotEmpty()
    orderId: string;

    @IsString()
    customerId: string;
}