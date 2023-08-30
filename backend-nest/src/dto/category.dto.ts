import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  title: string;

  @ApiProperty()
  bannerImage: Express.Multer.File;
}

export class UpdateCategoryDto {
  @IsOptional()
  @IsString()
  @ApiProperty()
  title: string;

  @ApiProperty()
  bannerImage: Express.Multer.File;
}
