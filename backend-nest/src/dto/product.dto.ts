import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  title: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  price: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  description: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  category: string;

  @ApiProperty()
  image: Express.Multer.File;
}

export class UpdateProductDto {
  @IsString()
  @IsOptional()
  @ApiProperty()
  title: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  price: number;

  @IsString()
  @IsOptional()
  @ApiProperty()
  description: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  category: string;

  @ApiProperty()
  image: Express.Multer.File;
}

export class CreateProductReviewDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(5)
  @ApiProperty({
    minimum: 0,
    maximum: 5,
    type: 'number',
  })
  rate: number;
}
