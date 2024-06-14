import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';

async function bootstrap() {
  const expressApp = express();
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressApp),
  );

  app.enableCors({
    origin: 'http://localhost:3001', // Permitir acesso a partir deste domínio
    credentials: true, // Permitir credenciais (cookies, cabeçalhos de autenticação) na solicitação
  });

  await app.listen(3000);
}
bootstrap();