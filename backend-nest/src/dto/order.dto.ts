import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString, Matches } from 'class-validator';
import { Product } from 'src/interfaces/product';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsString()
  @Matches(/[a-zA-Zа-яА-Я\s]+/)
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/[a-zA-Z0-9a-zA-Zа-яА-Я\s\-\.]+/)
  @ApiProperty()
  address: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/\+\d{11}/)
  @ApiProperty()
  phone: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  zipcode: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  delivery: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  city: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  deliveryPrice: number;

  @IsNotEmpty()
  @IsArray()
  @ApiProperty()
  products: Product[];
}
