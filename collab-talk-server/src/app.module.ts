import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CollaboratorModule } from './collaborator/collaborator.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Collaborator } from './collaborator/entities/collaborator.entity';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PictureModule } from './picture/picture.module';
import { Picture } from './picture/entities/picture.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Collaborator, Picture],
      synchronize: true,
      logging: true,
    }),
    CollaboratorModule,
    AuthModule,
    PictureModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
