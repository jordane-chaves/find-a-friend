import fs from 'node:fs'
import { resolve } from 'node:path'
import request from 'supertest'
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest'

import uploadConfig from '@/config/upload'
import { prisma } from '@/shared/infra/database/prisma'

import { app } from '../../app'

const { tmpFolder } = uploadConfig

const imageFilePath = resolve(
  __dirname,
  '..',
  '..',
  '..',
  '..',
  '..',
  '..',
  'test',
  'upload',
  'test-01.jpeg',
)

describe('Create Pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  afterEach(async () => {
    const pet = await prisma.pet.findFirst({
      include: {
        images: true,
      },
    })

    const image = pet?.images[0].file ?? ''

    const imageTmpPath = resolve(tmpFolder, image)

    try {
      await fs.promises.unlink(imageTmpPath)
    } catch (error) {
      console.error(error)
    }
  })

  it('should be able to create a pet', async () => {
    await request(app.server).post('/orgs').send({
      name: 'Seu Cãopanheiro',
      email: 'contato@caopanheiro.com',
      phone: '5537123456789',
      password: '123456',
      passwordConfirm: '123456',
      address: 'Rua do meio, 123',
      city: 'Boa viagem',
      cep: '01234-500',
    })

    const authResponse = await request(app.server).post('/sessions').send({
      email: 'contato@caopanheiro.com',
      password: '123456',
    })

    const token = authResponse.body.token

    const response = await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .field('name', 'Alfredo')
      .field(
        'description',
        'Eu sou um lindo doguinho de 3 anos, um jovem brincalhão que adora fazer companhia, uma bagunça mas também ama uma soneca.',
      )
      .field('age', 'cub')
      .field('independence', 'medium')
      .field('energy', 4)
      .field('size', 'small')
      .field('type', 'dog')
      .field(
        'adoptionRequirements',
        'Local grande para o animal correr e brincar.',
      )
      .field('adoptionRequirements', 'Proibido apartamento')
      .attach('images', imageFilePath)

    expect(response.statusCode).toEqual(201)
  })
})
