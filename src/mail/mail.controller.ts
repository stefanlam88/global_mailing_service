import { InjectQueue } from '@nestjs/bull';
import { Controller, Post, HttpStatus, Res, Body, Get } from '@nestjs/common';
import { Queue } from 'bull';
import { Logger } from '@nestjs/common';
import { MailService } from './mail.service';
import { CreateMailDTO } from './dto/create-mail.dto';

@Controller('mail')
export class MailController {
  constructor(@InjectQueue('mail') private readonly appQueue: Queue, private mailService: MailService) {}

  private readonly logger = new Logger(MailController.name);

  @Post('send')
  async send(@Res() res, @Body() createMailDTO: CreateMailDTO) {

    const job = await this.appQueue.add('send', createMailDTO);
    const jobModel = await this.mailService.addMail(createMailDTO);

    return res.status(HttpStatus.OK).json(
      {status: true, data: job}
    );

  }

  // Retrieve mail list
  @Get('list')
  async getAllUser(@Res() res) {
      const list = await this.mailService.getAllMails();
      return res.status(HttpStatus.OK).json(
        list
      );
  }

}
