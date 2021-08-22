import { NestFactory } from '@nestjs/core';

// Notice: don't import it from the '@configs/...'.
// It will not work, because of aliases start works only after this import
import './configs/ts-paths-fix-apply';

import { AppModule } from '@app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppConfigService } from './app/config/app-config.service';
import { readFileSync } from 'fs';

const httpsOptions = {
  key: readFileSync('./secrets/private-key.pem'),
  cert: readFileSync('./secrets/public-certificate.pem'),
};


async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, {
    httpsOptions: process.env.NODE_ENV == '443'? httpsOptions: {}
  });

  const appConfig: AppConfigService = app.get('AppConfigService');
  if(appConfig.isProduction === false) {
    const config = new DocumentBuilder()
    .setTitle('Shooting Companion')
    .setDescription('Nestjs Template')
    .addBearerAuth()
    .setVersion('1.0')
    .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
  }
  
  await app.listen(appConfig.port);
}
bootstrap();
