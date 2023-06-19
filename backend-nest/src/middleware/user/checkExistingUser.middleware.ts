import { Injectable, NestMiddleware } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Request, Response, NextFunction } from 'express';
import * as mongoose from 'mongoose';

import { UserType } from '../../types/user.types';

type ExtendedRequest = Request & { user: UserType };

@Injectable()
export class CheckExistingUserMiddleware implements NestMiddleware {
  constructor(
    @InjectModel('User')
    private readonly userModel: mongoose.Model<UserType>,
  ) {}

  async use(req: ExtendedRequest, res: Response, next: NextFunction) {
    const { _id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(404).send('Invalid id format.');
    }

    const user = await this.userModel
      .findOne({ _id })
      .select('-createdAt -updatedAt -__v -cartID -password');

    if (user === null) {
      return res.status(404).send('Could not find user with provided email');
    }

    req.user = user;

    next();
  }
}
