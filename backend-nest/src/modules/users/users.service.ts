import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import mongoose, { Model } from 'mongoose';

import { UserType } from '../../types/user.types';
import { CartType } from '../../types/cart.types';

import lang from '../../resources/lang';

import { CartsService } from '../carts/carts.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserType>,
    @InjectModel('Cart') private readonly cartModel: Model<CartType>,
    private readonly cartsService: CartsService,
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

    const salt = bcrypt.genSaltSync(Number(process.env.SALT_ROUNDS));
    const hashedPassword = bcrypt.hashSync(userData.password, salt);

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
}
