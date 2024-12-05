import { IsArray, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

class ProductDto {
  @IsString()
  product_id: string; // This will now be product_id, representing the foreign key

  @IsNumber()
  @Min(1)
  quantity: number;

  @IsNumber()
  price: number;
}

export class CreateOrderDto {
  @IsNotEmpty()
  @IsString()
  order_number: string;

  @IsNotEmpty()
  @IsString()
  status: string;

  @IsNotEmpty()
  @IsString()
  shipping_address: string;

  @IsArray()
  @IsNotEmpty()
  products: ProductDto[];

  @IsNotEmpty()
  @IsString()
  tracking_company: string;

  @IsNotEmpty()
  @IsString()
  tracking_number: string;
}
