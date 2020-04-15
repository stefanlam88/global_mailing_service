import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';
import { ValidationPipe } from  '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,
    {
      logger: ['error', 'warn', 'debug'],
    });
  //apply helmet security
  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe());
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    }),
  );
  await app.listen( process.env.PORT, () => {
    console.log('Node server is running on PORT: '+ process.env.PORT);
  });
}
bootstrap();
