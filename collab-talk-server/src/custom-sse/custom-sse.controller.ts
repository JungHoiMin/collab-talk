import { Controller, Req, Sse, UseGuards } from '@nestjs/common';
import { CustomSseService } from './custom-sse.service';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';
import { observer } from './custom-sse.manager';
import { filter, map } from 'rxjs';

@Controller('custom-sse')
export class CustomSseController {
  constructor(private readonly customSseService: CustomSseService) {}

  @Sse()
  @UseGuards(JwtAuthGuard)
  async sse(@Req() req: any) {
    await this.customSseService.addStream(req.user.uuid);
    req.on('close', () => this.customSseService.removeStream(req.user.uuid));

    return observer.pipe(
      filter((info) => info.uuid === req.user.uuid),
      map((info) => {
        return {
          data: {
            badge: info.badge,
          },
        } as MessageEvent;
      }),
    );
  }
}
