import { forwardRef, Module } from '@nestjs/common';
import { CustomSseService } from './custom-sse.service';
import { CustomSseController } from './custom-sse.controller';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectManager } from './entities/connect-manager.entity';
import { Alarm } from './entities/alarm.entity';
import { AlarmController } from './alarm.controller';
import { AlarmService } from './alarm.service';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([ConnectManager, Alarm]),
  ],
  providers: [CustomSseService, AlarmService],
  controllers: [CustomSseController, AlarmController],
  exports: [CustomSseService],
})
export class CustomSseModule {}
