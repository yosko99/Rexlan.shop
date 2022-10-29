import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Post,
  Put,
} from '@nestjs/common';
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

  @Get('/user/:_id')
  getUser(@RequestData('user') currentUser: UserType) {
    return currentUser;
  }

  @Put('/user/:_id')
  updateUser(
    @RequestData('user') currentUser: mongoose.Document<UserType> & UserType,
    @Body('email') email: string,
    @Body('name') name: string,
    @Body('phone') phone: string,
    @Body('address') address: string,
    @Body('zipcode') zipcode: string,
    @Body('isAdmin') isAdmin: boolean,
    @RequestData('currentLang') currentLang: string,
  ) {
    return this.usersService.updateUser(
      currentUser,
      {
        email,
        name,
        phone,
        address,
        zipcode,
        isAdmin,
      },
      currentLang,
    );
  }

  @Put('/current')
  updateCurrentUser(
    @RequestData('userDataFromToken')
    userDataFromToken: mongoose.Document<UserType> & UserType,
    @Body('name') name: string,
    @Body('phone') phone: string,
    @Body('address') address: string,
    @Body('zipcode') zipcode: string,
    @RequestData('currentLang') currentLang: string,
  ) {
    return this.usersService.updateUser(
      userDataFromToken,
      {
        name,
        phone,
        address,
        zipcode,
      },
      currentLang,
    );
  }

  @Post('/login')
  loginUser(
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('cartID') cartID: string,
    @RequestData('currentLang') currentLang: string,
  ) {
    return this.usersService.loginUser(email, password, cartID, currentLang);
  }

  @Get('/current')
  getCurrentUser(
    @RequestData('userDataFromToken') userDataFromToken: { email: string },
  ) {
    return this.usersService.getCurrentUser(userDataFromToken.email);
  }

  @Put('/current/change-password')
  changeCurrentUserPassword(
    @Body('oldPassword') oldPassword: string,
    @Body('newPassword') newPassword: string,
    @RequestData('userDataFromToken') userDataFromToken: { email: string },
    @RequestData('currentLang') currentLang: string,
  ) {
    return this.usersService.changeCurrentUserPassword(
      oldPassword,
      newPassword,
      userDataFromToken.email,
      currentLang,
    );
  }
}
