import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CollaboratorModule } from './collaborator/collaborator.module';

@Module({
  imports: [CollaboratorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
