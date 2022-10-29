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

  private initEmailMessage(emailInformation: EmailMessageType) {
    return {
      from: process.env.SENDER_EMAIL,
      to: emailInformation.to,
      subject: emailInformation.subject,
      text: emailInformation.text,
      html: emailInformation.html,
    };
  }

  private sendOptimisticEmail(currentLang: string) {
    if (process.env.SENDER_EMAIL === undefined) {
      return {
        msg: lang[currentLang].controllers.user.checkMailForPassword,
      };
    }
  }

  public async sendEmailMessage(
    emailInformation: EmailMessageType,
    currentLang: string,
  ) {
    this.sendOptimisticEmail(currentLang);

    this.transporter.sendMail(
      this.initEmailMessage(emailInformation),
      (err, _info: unknown) => {
        if (err) {
          return err;
        }

        return {
          msg: lang[currentLang].controllers.user.checkMailForPassword,
        };
      },
    );
  }
}
