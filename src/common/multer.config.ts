import { diskStorage } from "multer";
import { extname, join } from "path";
import { existsSync, mkdirSync } from "fs";
import { BadRequestException } from "@nestjs/common";
import { v4 as uuid } from "uuid";

const uploadPath = join(process.cwd(), "uploads", "movies")

if (!existsSync(uploadPath)) {
  mkdirSync(uploadPath, { recursive: true })
}

export const multerConfig = {
  storage: diskStorage({
    destination: uploadPath,
    filename: (_, file, cb) => {
      const ext = extname(file.originalname).toLowerCase();
      cb(null, `${uuid()}${ext}`)
    }
  }),

  fileFilter: (_, file, cb) => {
    const allowed = [".mp4", ".mkv", ".avi"]
    const ext = extname(file.originalname).toLowerCase()

    if (!allowed.includes(ext)) {
      return cb(
        new BadRequestException("Faqat mp4, mkv, avi formatlar ruxsat berilgan"),
        false
      )
    }
    cb(null, true)
  },
  limits: {
    fileSize: 1024 * 1024 * 1024
  }
}


