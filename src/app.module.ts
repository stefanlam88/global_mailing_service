import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BullModule } from '@nestjs/bull';
import { ConfigModule } from '@nestjs/config';
import { MailModule } from './mail/mail.module';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/mailing-service', { useNewUrlParser: true , useUnifiedTopology: true}),
    ConfigModule.forRoot(
      {isGlobal: true}
    ),
    MailModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
