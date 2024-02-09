import {
  Controller,
  Get,
  Post,
  Req,
  Res,
  ServiceUnavailableException,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PictureService } from './picture.service';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOption } from './utils/multer.setting';
import { CollaboratorService } from '../collaborator/collaborator.service';

@Controller('picture')
export class PictureController {
  constructor(
    private readonly pictureService: PictureService,
    private readonly collaboratorService: CollaboratorService,
  ) {}

  @Get('/main')
  @UseGuards(JwtAuthGuard)
  async getMainImage(@Req() req, @Res() res) {
    const uuid = req.user.uuid;
    const imageFileName: string =
      await this.collaboratorService.getImageMainName(uuid);

    const imageFile = await this.pictureService.getImageFile(
      uuid,
      imageFileName,
    );
    res.contentType('image/png');
    res.attachment();
    res.send(imageFile);
  }

  @Post('/upload')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('profile_image', multerOption))
  init(@Req() req, @UploadedFile() imageFile: Express.Multer.File) {
    if (
      this.pictureService.moveImageTempToUser(req.user.uuid, imageFile.filename)
    ) {
      if (
        this.pictureService.addProfileImage(req.user.uuid, imageFile.filename)
      ) {
        if (
          this.collaboratorService.updateProfileImage(
            req.user.uuid,
            imageFile.filename,
          )
        ) {
          return 'Ok';
        }
      }
    }
    return new ServiceUnavailableException('이미지를 업로드 하지 못했습니다.');
  }
}
