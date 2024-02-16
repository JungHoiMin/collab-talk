import {
  Body,
  Controller,
  forwardRef,
  Get,
  Inject,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { FriendsService } from './friends.service';
import { CollaboratorService } from '../collaborator/collaborator.service';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';
import { RequestFriendDto } from './dto/change-status-friends.dto';
import { CustomSseService } from '../custom-sse/custom-sse.service';

@Controller('friends')
export class FriendsController {
  constructor(
    private readonly friendsService: FriendsService,

    @Inject(forwardRef(() => CustomSseService))
    private readonly customSseSService: CustomSseService,

    @Inject(forwardRef(() => CollaboratorService))
    private readonly collaboratorService: CollaboratorService,
  ) {}

  @Get('/status/:email')
  @UseGuards(JwtAuthGuard)
  async getFriendStatusByEmail(@Req() req: any, @Param('email') email: string) {
    const getUUIDResponse = await this.collaboratorService.getRawOneByEmail(
      ['uuid'],
      email,
    );
    const UUID1 = req.user.uuid;
    const UUID2 = getUUIDResponse.uuid;

    return await this.friendsService.getFriendStatus(UUID1, UUID2);
  }

  @Post('/add')
  @UseGuards(JwtAuthGuard)
  async requestFriend(@Req() req: any, @Body() data: { email: string }) {
    try {
      const requestUUID = req.user.uuid;
      const requestor = await this.collaboratorService.getRawOneByEmail(
        ['email', 'name', 'nick_name'],
        req.user.email,
      );
      const getUUIDResponse = await this.collaboratorService.getRawOneByEmail(
        ['uuid'],
        data.email,
      );
      const responseUUID = getUUIDResponse.uuid;

      await this.customSseSService.sendSSE(responseUUID, 'request-friend', {
        requestor,
      });
      const requestFriendDto: RequestFriendDto = { requestUUID, responseUUID };
      return await this.friendsService.requestFriend(requestFriendDto);
    } catch (err) {
      return err;
    }
  }
}
