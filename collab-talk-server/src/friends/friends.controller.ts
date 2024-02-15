import {
  Body,
  Controller,
  forwardRef,
  Inject,
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

  @Post('/add')
  @UseGuards(JwtAuthGuard)
  async requestFriend(@Req() req: any, @Body() data: { email: string }) {
    try {
      const requestUUID = req.user.uuid;
      const getUUIDResponse = await this.collaboratorService.getRawOneByEmail(
        ['uuid'],
        data.email,
      );
      const responseUUID = getUUIDResponse.uuid;

      await this.customSseSService.sendSSE(responseUUID);
      // const data: RequestFriendDto = { requestUUID, responseUUID };
      // return await this.friendsService.requestFriend(data);
    } catch (err) {
      return err;
    }
  }
}
