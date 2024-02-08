import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { diskStorage } from 'multer';
import * as mime from 'mime-types';
import * as fs from 'fs';

export const uploadFolderPath = 'D:/uploadedImages/';
export const uploadTempFolderPath = uploadFolderPath + 'temp/';
export const multerOption: MulterOptions = {
  storage: diskStorage({
    destination: (req, file, cb) => {
      if (!fs.existsSync(uploadTempFolderPath)) {
        fs.mkdirSync(uploadTempFolderPath, { recursive: true });
      }
      cb(null, uploadTempFolderPath);
    },
    filename(req, file, cb) {
      const date = new Date();
      const fileName: string = `${date.getTime()}.${mime.extension(file.mimetype)}`;
      cb(null, fileName);
    },
  }),
};
