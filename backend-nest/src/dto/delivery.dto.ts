import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDeliveryDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  title: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  initialPrice: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  priceToAddress: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  image: string;
}

export class UpdateDeliveryDto {
  @IsOptional()
  @IsString()
  @ApiProperty()
  title: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  initialPrice: number;

  @IsOptional()
  @IsString()
  @ApiProperty()
  priceToAddress: number;

  @IsOptional()
  @IsString()
  @ApiProperty()
  image: string;
}
