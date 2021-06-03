import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { SearchServiceModule } from './search-service.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    SearchServiceModule,
    {
      transport: Transport.NATS,
      options: {
        url: 'nats://demo.nats.io:4222',
      }
    },
  );
  app.listen(() => console.log('Service Service Started'));
}
bootstrap();
