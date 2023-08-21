import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class AddCartProductDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  productId: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @ApiProperty()
  productQuantity: string;
}
