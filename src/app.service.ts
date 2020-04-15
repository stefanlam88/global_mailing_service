import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

}
