import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CollaboratorService } from './collaborator.service';
import { SignupDto, SignupResponseDto } from './dto/signup-collaborator.dto';
import { LoginDto, LoginResponseDto } from './dto/login-collaborator.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOption } from "./utils/multer.setting";

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
  @UseInterceptors(FileInterceptor('image_profile', multerOption))
  init(@UploadedFile() file: Express.Multer.File) {
    console.log(file);

  }

  // @Get()
  // findAll() {
  //   return this.collaboratorService.findAll();
  // }
  //
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.collaboratorService.findOne(+id);
  // }
  //
  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateCollaboratorDto: UpdateCollaboratorDto,
  // ) {
  //   return this.collaboratorService.update(+id, updateCollaboratorDto);
  // }
  //
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.collaboratorService.remove(+id);
  // }
}
