import 'dotenv/config';

import { AppModule } from './app.module.js';
import { NestFactory } from '@nestjs/core';


const port = process.env.PORT;

async function bootstrap() {
  console.log(port)
  const app = await NestFactory.create(AppModule, {
      bodyParser: true,
    }).catch((e): any=>{
      console.log(e)
  });
  console.log("test2")
  app.enableCors();

  console.log("test")
  console.log(port)
  await app.listen("8080");

}

bootstrap();
