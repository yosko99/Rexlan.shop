import { randomUUID } from 'crypto';
import * as multer from 'multer';

export const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    const { originalname } = file;
    cb(null, `${randomUUID()}-${originalname}`);
  },
});

export const multerFilter = {
  storage,
  fileFilter: async (req, file, cb) => {
    if (
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/jpeg' ||
      file.mimetype === 'image/png'
    ) {
      cb(null, true);
    } else {
      return cb(null, false);
    }
  },
};
