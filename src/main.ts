import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as path from 'path';
import * as cookieParser from 'cookie-parser';
import { setupSwagger } from './util/swagger/swagger.util';
import * as fs from 'fs';

dotenv.config({
  path: path.resolve(
    process.env.NODE_ENV === 'prod'
      ? '.prod.env'
      : process.env.NODE_ENV === 'dev'
      ? '.dev.env'
      : '.dev.env',
  ),
});

async function bootstrap() {
  let app;
  if (process.env.NODE_ENV === 'prod') {
    app = await NestFactory.create(AppModule);
  } else if (process.env.NODE_ENV === 'dev') {
    const httpsOptions = {
      key: fs.readFileSync('./src/util/localhost-key.pem'),
      cert: fs.readFileSync('./src/util/localhost.pem'),
    };
    app = await NestFactory.create(AppModule, {
      httpsOptions,
    });
  }

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
      transform: true,
    }),
  );
  app.use((req, res, next) => {
    // res.header(
    //   'Access-Control-Allow-Origin',
    //   'localhost:3000, https://dropbase.api.battle.zodium.io/',
    // );
    // res.header('Access-Control-Allow-Methods', 'GET,POST,UPDATE,DELETE');
    // res.header(
    //   'Access-Control-Allow-Headers',
    //   ' Origin,Accept,X-Requested-With,Content-Type,Access-Control-Request-Method,Access-Control-Request-Headers,Authorization',
    // );
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
  });

  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://localhost:3001',
      'https://localhost:3000',
      'https://localhost:3001',
      'https://localhost:80',
      'https://dropbase.api.battle.zodium.io',
    ], // 접근 권한을 부여하는 도메인
    credentials: true, // 응답 헤더에 Access-Control-Allow-Credentials 추가
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS', // 응답 헤더에 Access-Control-Allow-Methods 추가
    //optionsSuccessStatus: 200, // 응답 상태 200으로 설정
  });
  app.use(cookieParser());
  setupSwagger(app);
  await app.listen(3000);
}

bootstrap();
