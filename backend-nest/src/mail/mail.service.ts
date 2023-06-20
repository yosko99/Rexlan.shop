import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

import lang from '../resources/lang';

import dotenv = require('dotenv');
dotenv.config();

@Injectable()
export class MailService {
  private readonly transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // use SSL
      auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.SENDER_EMAIL_PASSWORD,
      },
    });
  }

  private initEmailMessage({ to, subject, text, html }: EmailMessageType) {
    return {
      from: process.env.SENDER_EMAIL,
      to,
      subject,
      text,
      html,
    };
  }

  public async sendEmailMessage(
    emailInformation: EmailMessageType,
    currentLang: string,
  ) {
    if (process.env.SENDER_EMAIL !== undefined) {
      await this.transporter.sendMail(this.initEmailMessage(emailInformation));
    }

    return {
      msg: lang[currentLang].controllers.user.checkMailForPassword,
    };
  }
}
