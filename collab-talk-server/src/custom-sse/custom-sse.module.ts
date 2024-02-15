import { forwardRef, Module } from '@nestjs/common';
import { CustomSseService } from './custom-sse.service';
import { CustomSseController } from './custom-sse.controller';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectManager } from './entities/connect-manager.entity';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([ConnectManager]),
  ],
  providers: [CustomSseService],
  controllers: [CustomSseController],
  exports: [CustomSseService],
})
export class CustomSseModule {}
