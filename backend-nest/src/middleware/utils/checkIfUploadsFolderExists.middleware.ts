import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { mkdirp } from 'mkdirp';

@Injectable()
export class CheckIfUploadsFolderExists implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    mkdirp.sync('./uploads');

    next();
  }
}
