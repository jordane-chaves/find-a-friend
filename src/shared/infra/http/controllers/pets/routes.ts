import { FastifyInstance } from 'fastify'
import multer from 'fastify-multer'

import uploadConfig from '@/config/upload'

import { verifyJWT } from '../../middlewares/verify-jwt'
import { create } from './create'
import { fetchPets } from './fetch-pets'
import { getPet } from './get-pet'

const { storage } = uploadConfig

const upload = multer({ storage })

export async function petsRoutes(app: FastifyInstance) {
  app.post(
    '/pets',
    {
      preHandler: upload.array('images', 6),
      onRequest: verifyJWT,
    },
    create,
  )

  app.get('/pets', fetchPets)
  app.get('/pets/:id', getPet)
}
