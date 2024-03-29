import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { Token } from '../../interfaces/token';

type ExtendedRequest = Request & {
  userDataFromToken: Token;
};

@Injectable()
export class VerifyJWT implements NestMiddleware {
  async use(req: ExtendedRequest, res: Response, next: NextFunction) {
    const tokenHeader = req.headers.authorization;
    const token = tokenHeader && tokenHeader.split(' ')[1];

    if (token === null) {
      return res.status(401).send('No token provided');
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, data) => {
      if (err) {
        return res.status(403).send(err);
      }

      req.userDataFromToken = data as Token;
      next();
    });
  }
}
