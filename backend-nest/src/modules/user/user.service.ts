/* eslint-disable @typescript-eslint/ban-ts-comment */
import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';

import lang from '../../resources/lang';

import { MailService } from '../mail/mail.service';

import { passwordResetTemplate } from '../mail/htmlTemplates/passwordReset.template';
import { Token } from '../../interfaces/token';
import { PrismaService } from '../../prisma/prisma.service';
import excludeObjectFields from '../../functions/excludeObjectFields';
import {
  CreateUserDto,
  LoginUserDto,
  UpdateCurrentUserDto,
  UpdateCurrentUserPassword,
  UpdateUserDto,
} from 'src/dto/user.dto';
import { User } from '@prisma/client';
import generateTemporaryPassword from 'src/functions/generateTemporaryPassword';

@Injectable()
export class UserService {
  constructor(
    private readonly mailService: MailService,
    private readonly prisma: PrismaService,
  ) {}

  async getUsers({ email }: Token) {
    const user = await this.retrieveUserByEmail(email);
    await this.isAdmin(user);

    const users = await this.prisma.user.findMany({
      where: { email: { not: email } },
    });

    return users.map((user) => {
      return excludeObjectFields(user, ['password']);
    });
  }

  async isAdmin(user: User) {
    if (!user.isAdmin) {
      throw new HttpException(
        'User not unauthorized, do not meet required privileges',
        401,
      );
    }
  }

  async createUser(
    {
      address,
      email,
      isAdmin,
      name,
      password,
      phone,
      cartId: userDtoCartId,
    }: CreateUserDto,
    sendtokenback: 'true' | 'false',
    currentLang: string,
  ) {
    const isUserRegistered =
      (await this.prisma.user.findFirst({
        where: { email },
      })) !== null;

    if (isUserRegistered) {
      return new HttpException(
        lang[currentLang].controllers.user.userWithEmailAlreadyExists,
        403,
      );
    }

    const hashedPassword = await this.createHashedPassword(password);

    const newUser = await this.prisma.user.create({
      data: {
        email: email,
        password: hashedPassword,
        name: name,
        address: address,
        phone: phone,
        isAdmin: typeof isAdmin === 'string' ? isAdmin === 'on' : isAdmin,
      },
    });

    // Create new user from register page
    if (sendtokenback === 'true') {
      const token = this.generateToken(email, password);
      const cartId = await this.assignUserCart(newUser.id, userDtoCartId);

      return {
        msg: lang[currentLang].controllers.user.accountCreated,
        token,
        cartId,
        user: newUser,
      };
    }

    // Create new user from admin panel
    await this.prisma.cart.create({
      data: { user: { connect: { id: newUser.id } } },
    });
    return {
      msg: lang[currentLang].controllers.user.userCreated,
      user: newUser,
    };
  }

  private async assignUserCart(userId: string, cartId?: string) {
    if (cartId === undefined || cartId === null) {
      const cart = await this.prisma.cart.create({
        data: { user: { connect: { id: userId } } },
      });
      return cart.id;
    }

    const cart = await this.prisma.cart.update({
      where: { id: cartId },
      data: { user: { connect: { id: userId } } },
    });

    return cart.id;
  }

  private generateToken(email: string, password: string) {
    const token = jwt.sign({ email, password }, process.env.JWT_SECRET_KEY);

    return token;
  }

  async retrieveUserById(userId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    if (user === null) {
      throw new HttpException('Could not find user with provided email', 404);
    }

    return excludeObjectFields(user, ['password']) as unknown as User;
  }

  async retrieveUserByEmail(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (user === null) {
      throw new HttpException('Could not find user with provided email', 404);
    }

    return excludeObjectFields(user, ['password']) as unknown as User;
  }

  async getUser(userId: string) {
    const user = await this.retrieveUserById(userId);

    return user;
  }

  async deleteUser(userId: string, { email }: Token, currentLang: string) {
    const user = await this.retrieveUserByEmail(email);
    await this.isAdmin(user);

    await this.retrieveUserById(userId);
    await this.prisma.user.delete({ where: { id: userId } });

    return {
      msg: lang[currentLang].controllers.user.userDeleted,
    };
  }

  async updateUser(
    userId: string,
    { email, name, phone, address, zipcode, isAdmin }: UpdateUserDto,
    currentLang: string,
  ) {
    const user = await this.retrieveUserById(userId);

    const checkExistingEmail = await this.prisma.user.findUnique({
      where: { email: email || '' },
    });

    if (
      checkExistingEmail !== null &&
      user.email !== checkExistingEmail.email
    ) {
      throw new HttpException(
        lang[currentLang].controllers.user.userWithEmailAlreadyExists,
        403,
      );
    }

    try {
      await this.prisma.user.update({
        where: { id: user.id },
        data: {
          email,
          name,
          phone,
          address,
          zipcode,
          isAdmin: typeof isAdmin === 'string' ? isAdmin === 'on' : isAdmin,
        },
      });

      return {
        msg: lang[currentLang].global.dataUpdated,
      };
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  async updateCurrentUser(
    { email: tokenEmail }: Token,
    { name, phone, address, zipcode }: UpdateCurrentUserDto,
    currentLang: string,
  ) {
    try {
      await this.prisma.user.update({
        where: { email: tokenEmail },
        data: {
          name,
          phone,
          address,
          zipcode,
        },
      });

      return {
        msg: lang[currentLang].global.dataUpdated,
      };
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  async getCurrentUserOrders({ email }: Token) {
    const orders = await this.prisma.order.findMany({
      where: { user: { email } },
      select: {
        createdAt: true,
        id: true,
        orderStatus: true,
        deliveryPrice: true,
        productsPrice: true,
      },
    });

    return orders;
  }

  async loginUser({ email, password }: LoginUserDto, currentLang: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
      include: { cart: { select: { id: true } } },
    });

    // Provided not registered email
    if (user === null) {
      throw new HttpException(
        lang[currentLang].controllers.user.userWithEmailDoesNotExist,
        403,
      );
    }

    const doesPasswordMatch = await bcrypt.compare(password, user.password);

    if (doesPasswordMatch) {
      const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET_KEY);
      const userCartId = await this.connectCartToUser(user.cartId, user.id);

      return {
        msg: lang[currentLang].controllers.user.loggedIn,
        token,
        cartId: userCartId,
      };
    }

    throw new HttpException(
      lang[currentLang].controllers.user.passwordMismatch,
      403,
    );
  }

  private async connectCartToUser(cartId: string, userId: string) {
    let userCartId = cartId;

    if (userCartId === null) {
      const cart = await this.prisma.cart.findUnique({
        where: { userId: userId },
        select: { id: true },
      });

      await this.prisma.user.update({
        where: { id: userId },
        data: { cart: { connect: { id: cart.id } } },
      });
      userCartId = cart.id;
    }

    return userCartId;
  }

  async getCurrentUser({ email }: Token) {
    const user = await this.prisma.user.findUnique({ where: { email } });

    return excludeObjectFields(user, ['password']);
  }

  async changeCurrentUserPassword(
    { newPassword, oldPassword }: UpdateCurrentUserPassword,
    { email }: Token,
    currentLang: string,
  ) {
    const user = await this.prisma.user.findUnique({ where: { email } });

    const doesPasswordMatch = await bcrypt.compare(oldPassword, user.password);

    if (doesPasswordMatch) {
      const newHashedPassword = await this.createHashedPassword(newPassword);

      await this.prisma.user.update({
        where: { email },
        data: { password: newHashedPassword },
      });

      return {
        msg: lang[currentLang].controllers.user.passwordUpdated,
      };
    }

    throw new HttpException(
      lang[currentLang].controllers.user.passwordMismatch,
      403,
    );
  }

  async resetPassword(email: string, currentLang: string) {
    await this.retrieveUserByEmail(email);

    const temporaryPassword = generateTemporaryPassword();
    const hashedPassword = await this.createHashedPassword(temporaryPassword);

    await this.prisma.user.update({
      where: { email },
      data: { password: hashedPassword },
    });

    const mailResponse = await this.mailService.sendEmailMessage(
      {
        to: email,
        subject: lang[currentLang].controllers.user.passwordReset.subject,
        text: lang[currentLang].controllers.user.passwordReset.text,
        html: passwordResetTemplate({
          password: temporaryPassword,
          title: lang[currentLang].controllers.user.passwordReset.title,
          description:
            lang[currentLang].controllers.user.passwordReset.description,
        }),
      },
      currentLang,
    );

    return mailResponse;
  }

  private async createHashedPassword(password: string): Promise<string> {
    const salt = bcrypt.genSaltSync(Number(process.env.SALT_ROUNDS));
    const hashedPassword = bcrypt.hashSync(password, salt);

    return hashedPassword;
  }
}
