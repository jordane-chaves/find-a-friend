import fastify from 'fastify'
import multer from 'fastify-multer'

import { env } from '@/shared/env'
import fastifyJwt from '@fastify/jwt'

import { orgsRoutes } from './controllers/orgs/routes'
import { petsRoutes } from './controllers/pets/routes'

export const app = fastify()

app.register(multer.contentParser)

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  sign: {
    expiresIn: '1d',
  },
})

app.register(orgsRoutes)
app.register(petsRoutes)
