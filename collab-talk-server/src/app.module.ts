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
import { FriendsModule } from './friends/friends.module';
import { Friends } from './friends/entities/friends.entity';
import { CustomSseModule } from './custom-sse/custom-sse.module';
import { ConnectManager } from './custom-sse/entities/connect-manager.entity';

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
      entities: [Collaborator, Picture, Friends, ConnectManager],
      synchronize: true,
      logging: true,
    }),
    CollaboratorModule,
    AuthModule,
    PictureModule,
    FriendsModule,
    CustomSseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
