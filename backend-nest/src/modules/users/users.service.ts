/* eslint-disable @typescript-eslint/ban-ts-comment */
import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';

import { UserType } from '../../types/user.types';

import lang from '../../resources/lang';

import { MailService } from '../../mail/mail.service';

import { generateRandomChars } from '../../functions/generateRandomChars';

import { passwordResetTemplate } from '../../mail/htmlTemplates/passwordReset.template';
import Token from '../../interfaces/token';
import { PrismaService } from '../prisma/prisma.service';
import excludeObjectFields from '../../functions/excludeObjectFields';

@Injectable()
export class UsersService {
  constructor(
    private readonly mailService: MailService,
    private readonly prisma: PrismaService,
  ) {}

  async getUsers(token: Token) {
    await this.isAdmin(token.email);

    const users = await this.prisma.user.findMany({
      where: { email: { not: token.email } },
    });

    return users.map((user) => {
      return excludeObjectFields(user, ['password']);
    });
  }

  async isAdmin(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
      select: {
        isAdmin: true,
      },
    });

    if (!user.isAdmin) {
      throw new HttpException(
        'User not unauthorized, do not meet required privileges',
        401,
      );
    }
  }

  async createUser(
    userDto: UserType,
    sendtokenback: 'true' | 'false',
    currentLang: string,
  ) {
    const isUserRegistered =
      (await this.prisma.user.findFirst({
        where: { email: userDto.email },
      })) !== null;

    if (isUserRegistered) {
      return new HttpException(
        lang[currentLang].controllers.user.userWithEmailAlreadyExists,
        403,
      );
    }

    const hashedPassword = await this.createHashedPassword(userDto.password);

    const newUser = await this.prisma.user.create({
      data: {
        email: userDto.email,
        password: hashedPassword,
        name: userDto.name,
        address: userDto.address,
        phone: userDto.phone,
        isAdmin:
          typeof userDto.isAdmin === 'string'
            ? userDto.isAdmin === 'on'
            : userDto.isAdmin,
      },
    });

    // Create new user from register page
    if (sendtokenback === 'true') {
      const token = this.generateToken(userDto.email, userDto.password);

      const cartId = await this.assignUserCart(newUser.id, userDto.cartId);

      return {
        msg: lang[currentLang].controllers.user.accountCreated,
        token,
        cartId,
        user: newUser,
      };
    }

    // Create new user from admin panel
    return {
      msg: lang[currentLang].controllers.user.userCreated,
      user: newUser,
    };
  }

  private async assignUserCart(userId: string, cartId?: string) {
    if (cartId === undefined || cartId === null) {
      const cart = await this.prisma.cart.create({
        data: { user: { connect: { id: userId } }, userId },
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

  private async retrieveUser(userId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    if (user === null) {
      throw new HttpException('Could not find user with provided email', 404);
    }

    return excludeObjectFields(user, ['password']);
  }

  async getUser(userId: string) {
    const user = await this.retrieveUser(userId);

    return user;
  }

  async deleteUser(userId: string, currentLang: string) {
    await this.retrieveUser(userId);
    await this.prisma.user.delete({ where: { id: userId } });

    return {
      msg: lang[currentLang].controllers.user.userDeleted,
    };
  }

  async updateUser(
    userId: string,
    { email, name, phone, address, zipcode, isAdmin }: UserType,
    currentLang: string,
  ) {
    const user = await this.retrieveUser(userId);

    const checkExistingEmail = await this.prisma.user.findUnique({
      where: { email },
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
    { name, phone, address, zipcode }: UserType,
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

  async loginUser(email: string, password: string, currentLang: string) {
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

      return {
        msg: lang[currentLang].controllers.user.loggedIn,
        token,
        cartId: user.cartId,
      };
    }

    throw new HttpException(
      lang[currentLang].controllers.user.passwordMismatch,
      403,
    );
  }

  async getCurrentUser({ email }: Token) {
    const user = await this.prisma.user.findUnique({ where: { email } });

    return excludeObjectFields(user, ['password']);
  }

  async changeCurrentUserPassword(
    oldPassword: string,
    newPassword: string,
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
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (email === undefined || user === null) {
      throw new NotFoundException(
        lang[currentLang].controllers.user.couldNotFindEmail,
      );
    }

    const temporaryPassword = generateRandomChars(15);
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
