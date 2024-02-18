import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';
import { AlarmService } from './alarm.service';

@Controller('alarm')
export class AlarmController {
  constructor(private readonly alarmService: AlarmService) {}
  @Get()
  @UseGuards(JwtAuthGuard)
  async getAlarmList(@Req() req: any) {
    return await this.alarmService.getAlarmListByUUID(req.user.uuid);
  }
}
