import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import mongoose, { Model } from 'mongoose';

import { UserType } from '../../types/user.types';
import { CartType } from '../../types/cart.types';

import lang from '../../resources/lang';

import { CartsService } from '../carts/carts.service';
import { MailService } from '../../mail/mail.service';

import { generateRandomChars } from '../../functions/generateRandomChars';

import { passwordResetTemplate } from '../../mail/htmlTemplates/passwordReset.template';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserType>,
    @InjectModel('Cart') private readonly cartModel: Model<CartType>,
    private readonly cartsService: CartsService,
    private readonly mailService: MailService,
  ) {}

  async getUsers() {
    const users = await this.userModel.find({}).select('-password');

    return users;
  }

  async createUser(
    userData: UserType,
    sendtokenback: 'true' | 'false',
    currentLang: string,
  ) {
    const checkRegistered = await this.userModel.findOne({
      email: userData.email,
    });

    // Email is already registered
    if (checkRegistered !== null) {
      return new HttpException(
        lang[currentLang].controllers.user.userWithEmailAlreadyExists,
        403,
      );
    }

    const hashedPassword = await this.createHashedPassword(userData.password);

    const newUser = await this.userModel.create({
      email: userData.email,
      password: hashedPassword,
      name: userData.name,
      address: userData.address,
      phone: userData.phone,
    });

    // Create new user from register page
    if (sendtokenback === 'true') {
      const token = jwt.sign(
        { email: userData.email },
        process.env.JWT_SECRET_KEY,
      );

      const cartID = await this.cartsService.checkAndUpdateCart(
        userData.email,
        userData.cartID,
      );

      return {
        msg: lang[currentLang].controllers.user.accountCreated,
        token,
        cartID,
        user: newUser,
      };
    }

    // Create new user from admin panel
    return {
      msg: lang[currentLang].controllers.user.userCreated,
      user: newUser,
    };
  }

  async deleteUser(
    currentUser: mongoose.Document<UserType> & UserType,
    currentLang: string,
  ) {
    await this.cartModel.deleteOne({ userID: currentUser._id });
    await this.userModel.deleteOne({ _id: currentUser._id });

    return {
      msg: lang[currentLang].controllers.user.userDeleted,
    };
  }

  async updateUser(
    currentUser: mongoose.Document<UserType> & UserType,
    { email, name, phone, address, zipcode, isAdmin }: UserType,
    currentLang: string,
  ) {
    let findUserQuery = {};

    if (currentUser._id !== undefined) {
      // When route is PUT /api/users/user/:_id
      const checkExistingEmail = await this.userModel.findOne({
        email,
      });

      if (
        checkExistingEmail !== null &&
        currentUser.email !== checkExistingEmail.email
      ) {
        return new HttpException(
          lang[currentLang].controllers.user.userWithEmailAlreadyExists,
          403,
        );
      }
      findUserQuery = { _id: currentUser._id };
    } else {
      // When route is POST /api/users/current
      findUserQuery = { email: currentUser.email };
    }

    try {
      await this.userModel.updateOne(findUserQuery, {
        email,
        name,
        phone,
        address,
        zipcode,
        isAdmin,
      });

      return {
        msg: lang[currentLang].global.dataUpdated,
      };
    } catch (error) {
      return new NotFoundException(error);
    }
  }

  async loginUser(
    email: string,
    password: string,
    cartID: string,
    currentLang: string,
  ) {
    const user = await this.userModel.findOne({ email });

    // Provided not registered email
    if (user === null) {
      return new HttpException(
        lang[currentLang].controllers.user.userWithEmailDoesNotExist,
        403,
      );
    }

    const doesPasswordMatch = await bcrypt.compare(password, user.password);

    if (doesPasswordMatch) {
      const checkedCartID = await this.cartsService.checkAndUpdateCart(
        email,
        cartID,
      );

      const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET_KEY);

      return {
        msg: lang[currentLang].controllers.user.loggedIn,
        token,
        cartID: checkedCartID,
      };
    }

    return new HttpException(
      lang[currentLang].controllers.user.passwordMismatch,
      403,
    );
  }

  async getCurrentUser(userEmailFromToken: string) {
    const user = await this.userModel
      .findOne({ email: userEmailFromToken })
      .select('-password');

    return { user };
  }

  async changeCurrentUserPassword(
    oldPassword: string,
    newPassword: string,
    userEmailFromToken: string,
    currentLang: string,
  ) {
    const user = await this.userModel.findOne({ email: userEmailFromToken });

    const doesPasswordMatch = await bcrypt.compare(oldPassword, user.password);

    if (doesPasswordMatch) {
      user.password = await this.createHashedPassword(newPassword);

      await user.save();

      return {
        msg: lang[currentLang].controllers.user.passwordUpdated,
      };
    }

    return new HttpException(
      lang[currentLang].controllers.user.passwordMismatch,
      403,
    );
  }

  async resetPassword(email: string, currentLang: string) {
    const user = await this.userModel.findOne({ email });

    if (email === undefined || user === null) {
      return new NotFoundException(
        lang[currentLang].controllers.user.couldNotFindEmail,
      );
    }

    const temporaryPassword = generateRandomChars(15);
    const hashedPassword = await this.createHashedPassword(temporaryPassword);

    await this.userModel.updateOne(
      { email },
      {
        password: hashedPassword,
      },
    );

    const mailResponse = await this.mailService.sendEmailMessage(
      {
        to: email,
        subject: 'Password reset',
        text: 'Password reset',
        html: passwordResetTemplate(temporaryPassword),
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
