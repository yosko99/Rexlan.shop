import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { RequestData } from '../../decorators/requestData.decorator';

import { UsersService } from './users.service';
import { Token } from 'src/interfaces/token';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers(
    @RequestData('userDataFromToken')
    userDataFromToken: Token,
  ) {
    return this.usersService.getUsers(userDataFromToken);
  }

  @Get('/current/orders')
  getCurrentUserOrders(
    @RequestData('userDataFromToken')
    userDataFromToken: Token,
  ) {
    return this.usersService.getCurrentUserOrders(userDataFromToken);
  }

  @Post()
  createUser(
    @Headers() headers: { sendtokenback: 'true' | 'false' },
    @Body('email') email: string,
    @Body('name') name: string,
    @Body('password') password: string,
    @Body('address') address: string,
    @Body('phone') phone: string,
    @Body('isAdmin') isAdmin: boolean,
    @Body('cartId') cartId: string,
    @RequestData('currentLang') currentLang: string,
  ) {
    return this.usersService.createUser(
      { email, name, password, address, phone, cartId, isAdmin },
      headers.sendtokenback,
      currentLang,
    );
  }

  @Delete('/:id')
  deleteUser(
    @Param('id') userId: string,
    @RequestData('currentLang') currentLang: string,
  ) {
    return this.usersService.deleteUser(userId, currentLang);
  }

  @Get('/user/:id')
  getUser(@Param('id') userId: string) {
    return this.usersService.getUser(userId);
  }

  @Put('/user/:id')
  updateUser(
    @Body('email') email: string,
    @Body('name') name: string,
    @Body('phone') phone: string,
    @Body('address') address: string,
    @Body('zipcode') zipcode: string,
    @Body('isAdmin') isAdmin: boolean,
    @RequestData('currentLang') currentLang: string,
    @Param('id') userId: string,
  ) {
    return this.usersService.updateUser(
      userId,
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
    userDataFromToken: Token,
    @Body('name') name: string,
    @Body('phone') phone: string,
    @Body('address') address: string,
    @Body('zipcode') zipcode: string,
    @RequestData('currentLang') currentLang: string,
  ) {
    return this.usersService.updateCurrentUser(
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
    @RequestData('currentLang') currentLang: string,
  ) {
    return this.usersService.loginUser(email, password, currentLang);
  }

  @Get('/current')
  getCurrentUser(@RequestData('userDataFromToken') userDataFromToken: Token) {
    return this.usersService.getCurrentUser(userDataFromToken);
  }

  @Put('/current/password')
  changeCurrentUserPassword(
    @Body('oldPassword') oldPassword: string,
    @Body('newPassword') newPassword: string,
    @RequestData('userDataFromToken') userDataFromToken: Token,
    @RequestData('currentLang') currentLang: string,
  ) {
    return this.usersService.changeCurrentUserPassword(
      oldPassword,
      newPassword,
      userDataFromToken,
      currentLang,
    );
  }

  @Post('/password-reset')
  resetPassword(
    @Body('email') email: string,
    @RequestData('currentLang') currentLang: string,
  ) {
    return this.usersService.resetPassword(email, currentLang);
  }
}
