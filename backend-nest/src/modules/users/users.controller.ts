import { Body, Controller, Delete, Get, Headers, Post } from '@nestjs/common';
import mongoose from 'mongoose';

import { RequestData } from '../../decorators/requestData.decorator';

import { UserType } from '../../types/user.types';

import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers() {
    return this.usersService.getUsers();
  }

  @Post()
  createUser(
    @Headers() headers: { sendtokenback: 'true' | 'false' },
    @Body('email') email: string,
    @Body('name') name: string,
    @Body('password') password: string,
    @Body('address') address: string,
    @Body('phone') phone: string,
    @Body('cartID') cartID: string,
    @RequestData('currentLang') currentLang: string,
  ) {
    return this.usersService.createUser(
      { email, name, password, address, phone, cartID },
      headers.sendtokenback,
      currentLang,
    );
  }

  @Delete(':_id')
  deleteUser(
    @RequestData('user') currentUser: mongoose.Document<UserType> & UserType,
    @RequestData('currentLang') currentLang: string,
  ) {
    return this.usersService.deleteUser(currentUser, currentLang);
  }
}
