
import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { MailController } from './mail.controller';
import { MailProcessor } from './mail.processor';
import { MailService } from './mail.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MailSchema } from './schemas/mail.schema';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'mail',
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    MongooseModule.forFeature([{ name: 'Mail', schema: MailSchema }])
  ],
  controllers: [MailController],
  providers: [MailProcessor, MailService],
})
export class MailModule {}
