import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CollaboratorModule } from './collaborator/collaborator.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Collaborator } from './collaborator/entities/collaborator.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'hoeminj',
      password: 'Hoe**982326',
      database: 'ct_test',
      entities: [Collaborator],
      synchronize: true,
    }),
    CollaboratorModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
