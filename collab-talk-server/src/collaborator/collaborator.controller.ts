import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  UploadedFile,
  UseInterceptors,
  UseGuards,
  Req,
} from '@nestjs/common';
import { CollaboratorService } from './collaborator.service';
import { SignupDto, SignupResponseDto } from './dto/signup-collaborator.dto';
import { LoginDto, LoginResponseDto } from './dto/login-collaborator.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOption } from './utils/multer.setting';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';

@Controller('collaborator')
export class CollaboratorController {
  constructor(private readonly collaboratorService: CollaboratorService) {}

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

  @Post('/init/image')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('profile_image', multerOption))
  init(@Req() req, @UploadedFile() file: Express.Multer.File) {
    console.log(req.user.uuid);
    return { fileName: file.filename };
  }
}
