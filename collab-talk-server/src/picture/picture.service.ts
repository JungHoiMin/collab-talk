import { Injectable } from '@nestjs/common';
import { uploadFolderPath, uploadTempFolderPath } from './utils/multer.setting';
import * as fs from 'fs';
import { Repository } from 'typeorm';
import { Picture } from './entities/picture.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PictureService {
  constructor(
    @InjectRepository(Picture)
    private pictrueRepository: Repository<Picture>,
  ) {}
  moveImageTempToUser(uuid: string, imageFileName: string) {
    console.log(uuid, imageFileName);
    const uploadUserFolderPath = uploadFolderPath + uuid + '/';
    console.log(uploadUserFolderPath);
    if (!fs.existsSync(uploadUserFolderPath)) {
      fs.mkdirSync(uploadUserFolderPath, { recursive: true });
    }

    const oldFilePath = uploadTempFolderPath + imageFileName;
    const newFilePath = uploadUserFolderPath + imageFileName;

    // 이미지 파일이 존재한다면...
    if (fs.existsSync(uploadTempFolderPath + imageFileName)) {
      fs.rename(oldFilePath, newFilePath, (err) => {
        if (err) {
          console.log(err);
          return false;
        }
      });
      return true;
    }
    return false;
  }

  async addProfileImage(uuid: string, imageFileName: string) {
    try {
      await this.pictrueRepository
        .createQueryBuilder()
        .insert()
        .into(Picture)
        .values({ uuid, image_file_name: imageFileName })
        .execute();
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}
