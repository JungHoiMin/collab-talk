import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  UseGuards,
  Req,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { CollaboratorService } from './collaborator.service';
import { SignupDto, SignupResponseDto } from './dto/signup-collaborator.dto';
import { LoginDto, LoginResponseDto } from './dto/login-collaborator.dto';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';
import { InitDto } from './dto/init-collaborator.dto';
import { PictureService } from '../picture/picture.service';
import { CollaboratorsForListDto } from './dto/list-collaborator.dto';

@Controller('collaborator')
export class CollaboratorController {
  constructor(
    private readonly collaboratorService: CollaboratorService,

    @Inject(forwardRef(() => PictureService))
    private readonly pictureService: PictureService,
  ) {}

  @Post('/login')
  login(@Body() loginDto: LoginDto): Promise<LoginResponseDto> {
    return this.collaboratorService.login(loginDto);
  }
  @Post('/signup')
  signup(@Body() signupDto: SignupDto): Promise<SignupResponseDto> {
    return this.collaboratorService.signup(signupDto);
  }

  @Get('/check/email/:value')
  checkIsDuplicatedByEmail(@Param('value') email: string) {
    return this.collaboratorService.checkExistsByEmail(email);
  }

  @Get('/check/phone_number/:value')
  checkIsDuplicatedByPhoneNumber(@Param('value') phone_number: string) {
    return this.collaboratorService.checkExistsByPhoneNumber(phone_number);
  }

  @Post('/init')
  @UseGuards(JwtAuthGuard)
  initProfile(@Req() req: any, @Body() initDto: InitDto) {
    return this.collaboratorService.initProfile(req.user.uuid, initDto);
  }

  @Get('/list/:keyword')
  @UseGuards(JwtAuthGuard)
  async getCollaboratorsListByKeyword(
    @Req() req: any,
    @Param('keyword') keyword: string,
  ): Promise<CollaboratorsForListDto[]> {
    return await this.collaboratorService.findCollaboratorsListByKeyword(
      req.user.uuid,
      keyword,
    );
  }
}
