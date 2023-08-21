import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @IsNotEmpty()
  @MinLength(8)
  @IsString()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,}$/)
  @ApiProperty({ minLength: 8, type: 'string' })
  password: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;
}

export class CreateUserDto {
  @IsNotEmpty()
  @MinLength(8)
  @IsString()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,}$/)
  @ApiProperty({ minLength: 8, type: 'string' })
  password: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;

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

  @IsOptional()
  @IsString()
  isAdmin: string;

  @IsOptional()
  @IsString()
  cartId: string;
}

export class UpdateUserDto {
  @IsOptional()
  @MinLength(8)
  @IsString()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,}$/)
  @ApiProperty({ minLength: 8, type: 'string' })
  password: string;

  @IsOptional()
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsOptional()
  @IsString()
  @Matches(/[a-zA-Zа-яА-Я\s]+/)
  @ApiProperty()
  name: string;

  @IsOptional()
  @IsString()
  @Matches(/[a-zA-Z0-9a-zA-Zа-яА-Я\s\-\.]+/)
  @ApiProperty()
  address: string;

  @IsOptional()
  @IsString()
  @Matches(/\+\d{11}/)
  @ApiProperty()
  phone: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  zipcode: string;

  @IsOptional()
  @IsString()
  isAdmin: string;
}

export class UpdateCurrentUserDto {
  @IsOptional()
  @IsString()
  @Matches(/[a-zA-Zа-яА-Я\s]+/)
  @ApiProperty()
  name: string;

  @IsOptional()
  @IsString()
  @Matches(/[a-zA-Z0-9a-zA-Zа-яА-Я\s\-\.]+/)
  @ApiProperty()
  address: string;

  @IsOptional()
  @IsString()
  @Matches(/\+\d{11}/)
  @ApiProperty()
  phone: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  zipcode: string;
}

export class UpdateCurrentUserPassword {
  @MinLength(8)
  @IsString()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,}$/)
  @ApiProperty({ minLength: 8, type: 'string' })
  oldPassword: string;

  @MinLength(8)
  @IsString()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,}$/)
  @ApiProperty({ minLength: 8, type: 'string' })
  newPassword: string;
}
