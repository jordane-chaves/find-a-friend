import multer from 'fastify-multer'
import crypto from 'node:crypto'
import { resolve } from 'node:path'

const tmpFolder = resolve(__dirname, '..', '..', 'tmp')

export default {
  tmpFolder,
  storage: multer.diskStorage({
    destination: tmpFolder,
    filename: (request, file, callback) => {
      const fileHash = crypto.randomBytes(16).toString('hex')
      const filename = `${fileHash}-${file.originalname}`

      callback(null, filename)
    },
  }),
}
