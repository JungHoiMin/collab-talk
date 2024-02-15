import { forwardRef, Module } from '@nestjs/common';
import { CollaboratorService } from './collaborator.service';
import { CollaboratorController } from './collaborator.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Collaborator } from './entities/collaborator.entity';
import { AuthModule } from '../auth/auth.module';
import { PictureModule } from '../picture/picture.module';

@Module({
  imports: [
    forwardRef(() => PictureModule),
    TypeOrmModule.forFeature([Collaborator]),
    forwardRef(() => AuthModule),
  ],
  controllers: [CollaboratorController],
  providers: [CollaboratorService],
  exports: [CollaboratorService],
})
export class CollaboratorModule {}
