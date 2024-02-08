import { forwardRef, Module } from '@nestjs/common';
import { PictureService } from './picture.service';
import { PictureController } from './picture.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Picture } from './entities/picture.entity';
import { AuthModule } from '../auth/auth.module';
import { CollaboratorModule } from '../collaborator/collaborator.module';

@Module({
  imports: [
    CollaboratorModule,
    TypeOrmModule.forFeature([Picture]),
    forwardRef(() => AuthModule),
  ],
  controllers: [PictureController],
  providers: [PictureService],
})
export class PictureModule {}
