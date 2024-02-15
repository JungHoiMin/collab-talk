import { forwardRef, Module } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { FriendsController } from './friends.controller';
import { CollaboratorModule } from '../collaborator/collaborator.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Friends } from './entities/friends.entity';
import { AuthModule } from '../auth/auth.module';
import { CustomSseModule } from '../custom-sse/custom-sse.module';

@Module({
  imports: [
    forwardRef(() => CollaboratorModule),
    forwardRef(() => CustomSseModule),
    TypeOrmModule.forFeature([Friends]),
    forwardRef(() => AuthModule),
  ],
  controllers: [FriendsController],
  providers: [FriendsService],
})
export class FriendsModule {}
