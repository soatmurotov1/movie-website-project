import { diskStorage } from 'multer'
import { extname } from 'path'

export const multerConfig = {
  storage: diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
      const uniqueName =
        Date.now() + '-' + Math.round(Math.random() * 1e9)
      const ext = extname(file.originalname)
      cb(null, `${uniqueName}${ext}`)
    },
  }),
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      cb(new Error('Only images allowed'), false)
    }
    cb(null, true)
  },
}
