import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { diskStorage } from 'multer';
import * as mime from 'mime-types';
import * as fs from 'fs';

const uploadFolderPath = 'D:/uploadedImages/temp/';
export const multerOption: MulterOptions = {
  storage: diskStorage({
    destination: (req, file, cb) => {
      if (!fs.existsSync(uploadFolderPath)) {
        fs.mkdirSync(uploadFolderPath, { recursive: true });
      }
      cb(null, uploadFolderPath);
    },
    filename(req, file, cb) {
      const date = new Date();
      const fileName: string = `${date.getTime()}.${mime.extension(file.mimetype)}`;
      cb(null, fileName);
    },
  }),
};
