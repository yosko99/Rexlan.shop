import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  HttpCode,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { RequestData } from '../../decorators/requestData.decorator';

import { UserService } from './user.service';
import { Token } from 'src/interfaces/token';
import {
  ApiHeader,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  CreateUserDto,
  LoginUserDto,
  UpdateCurrentUserDto,
  UpdateCurrentUserPassword,
  UpdateUserDto,
} from 'src/dto/user.dto';
import { currentLangQuery } from 'src/swagger/apiQueryOptions';
import {
  invalidTokenResponse,
  missingFieldsResponse,
  noTokenAndNoAdminResponse,
  noTokenResponse,
  passwordMismatchResponse,
} from 'src/swagger/apiResponseOptions';

@Controller('users')
@ApiTags('Users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiHeader({ name: 'Authorization', required: true })
  @ApiOperation({ summary: 'Fetch all users' })
  @ApiResponse(invalidTokenResponse)
  @ApiResponse(noTokenAndNoAdminResponse)
  @ApiResponse({ status: 200, description: 'Users fetched' })
  getUsers(
    @RequestData('userDataFromToken')
    userDataFromToken: Token,
  ) {
    return this.userService.getUsers(userDataFromToken);
  }

  @Get('/current/orders')
  @ApiHeader({ name: 'Authorization', required: true })
  @ApiOperation({ summary: 'Fetch current user orders' })
  @ApiResponse(noTokenResponse)
  @ApiResponse(invalidTokenResponse)
  @ApiResponse({ status: 200, description: 'User orders fetched' })
  getCurrentUserOrders(
    @RequestData('userDataFromToken')
    userDataFromToken: Token,
  ) {
    return this.userService.getCurrentUserOrders(userDataFromToken);
  }

  @Post()
  @UsePipes(ValidationPipe)
  @ApiHeader({ name: 'sendtokenback', required: false })
  @ApiOperation({ summary: 'Create new user' })
  @ApiQuery(currentLangQuery)
  @ApiResponse(missingFieldsResponse)
  @ApiResponse({ status: 201, description: 'User created' })
  @ApiResponse({ status: 403, description: 'User with email already exists' })
  createUser(
    @Headers() headers: { sendtokenback: 'true' | 'false' },
    @Body() createUserDto: CreateUserDto,
    @RequestData('currentLang') currentLang: string,
  ) {
    return this.userService.createUser(
      createUserDto,
      headers.sendtokenback,
      currentLang,
    );
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete user by id' })
  @ApiHeader({ name: 'Authorization', required: true })
  @ApiResponse(invalidTokenResponse)
  @ApiResponse(noTokenAndNoAdminResponse)
  @ApiResponse({ status: 200, description: 'User deleted' })
  deleteUser(
    @Param('id') userId: string,
    @RequestData('userDataFromToken')
    userDataFromToken: Token,
    @RequestData('currentLang') currentLang: string,
  ) {
    return this.userService.deleteUser(userId, userDataFromToken, currentLang);
  }

  @Get('/user/:id')
  @ApiOperation({ summary: 'Get user by id' })
  @ApiResponse({ status: 200, description: 'User fetched' })
  @ApiResponse({ status: 404, description: 'User not found' })
  getUser(@Param('id') userId: string) {
    return this.userService.getUser(userId);
  }

  @Put('/user/:id')
  @UsePipes(ValidationPipe)
  @ApiOperation({ summary: 'Update user by id' })
  @ApiQuery(currentLangQuery)
  @ApiResponse(missingFieldsResponse)
  @ApiResponse({ status: 200, description: 'User updated' })
  updateUser(
    @Body() updateUserDto: UpdateUserDto,
    @RequestData('currentLang') currentLang: string,
    @Param('id') userId: string,
  ) {
    return this.userService.updateUser(userId, updateUserDto, currentLang);
  }

  @Put('/current')
  @UsePipes(ValidationPipe)
  @ApiOperation({ summary: 'Update current user' })
  @ApiQuery(currentLangQuery)
  @ApiResponse(missingFieldsResponse)
  @ApiResponse({ status: 200, description: 'Current user updated' })
  updateCurrentUser(
    @RequestData('userDataFromToken')
    userDataFromToken: Token,
    @Body() updateCurrentUserDto: UpdateCurrentUserDto,
    @RequestData('currentLang') currentLang: string,
  ) {
    return this.userService.updateCurrentUser(
      userDataFromToken,
      updateCurrentUserDto,
      currentLang,
    );
  }

  @Post('/login')
  @HttpCode(200)
  @UsePipes(ValidationPipe)
  @ApiOperation({ summary: 'Login a user' })
  @ApiResponse(missingFieldsResponse)
  @ApiResponse(passwordMismatchResponse)
  @ApiResponse({ status: 404, description: 'Non existent email' })
  @ApiResponse({ status: 200, description: 'Logged in successfully' })
  loginUser(
    @Body() loginUserDto: LoginUserDto,
    @RequestData('currentLang') currentLang: string,
  ) {
    return this.userService.loginUser(loginUserDto, currentLang);
  }

  @Get('/current')
  @ApiOperation({ summary: 'Get current user' })
  @ApiResponse(noTokenResponse)
  @ApiResponse(invalidTokenResponse)
  @ApiResponse({ status: 200, description: 'User fetched' })
  @ApiResponse({ status: 404, description: 'User not found' })
  getCurrentUser(@RequestData('userDataFromToken') userDataFromToken: Token) {
    return this.userService.getCurrentUser(userDataFromToken);
  }

  @Put('/current/password')
  @UsePipes(ValidationPipe)
  @ApiOperation({ summary: 'Update current user password' })
  @ApiQuery(currentLangQuery)
  @ApiResponse(missingFieldsResponse)
  @ApiResponse(passwordMismatchResponse)
  @ApiResponse({ status: 200, description: 'Password updated' })
  changeCurrentUserPassword(
    @Body() updateCurrentUserPasswordDto: UpdateCurrentUserPassword,
    @RequestData('userDataFromToken') userDataFromToken: Token,
    @RequestData('currentLang') currentLang: string,
  ) {
    return this.userService.changeCurrentUserPassword(
      updateCurrentUserPasswordDto,
      userDataFromToken,
      currentLang,
    );
  }

  @Post('/password-reset')
  @UsePipes(ValidationPipe)
  @ApiOperation({ summary: 'Reset password' })
  @ApiQuery(currentLangQuery)
  @ApiResponse({ status: 200, description: 'Password reset' })
  @ApiResponse({ status: 404, description: 'Non existent email' })
  resetPassword(
    @Body('email') email: string,
    @RequestData('currentLang') currentLang: string,
  ) {
    return this.userService.resetPassword(email, currentLang);
  }
}
