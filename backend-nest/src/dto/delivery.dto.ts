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

  @ApiProperty()
  image: Express.Multer.File;
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

  @ApiProperty()
  image: Express.Multer.File;
}
