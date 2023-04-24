import { hash } from 'bcryptjs'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { prisma } from '@/shared/infra/database/prisma'

import { app } from '../../app'

describe('Fetch Pets (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get many pets', async () => {
    await prisma.org.create({
      data: {
        name: 'Seu Cãopanheiro',
        email: 'contato@caopanheiro.com',
        phone: '5537123456789',
        password_hash: await hash('123456', 6),
        address: 'Rua do meio, 123',
        city: 'Boa viagem',
        cep: '01234-500',
        pets: {
          createMany: {
            data: [
              {
                name: 'Pet-01',
                description: 'Exemplo de descrição.',
                age: 'cub',
                independence: 'medium',
                energy: 4,
                size: 'small',
                type: 'dog',
              },
              {
                name: 'Pet-02',
                description: 'Exemplo de descrição.',
                age: 'cub',
                independence: 'medium',
                energy: 5,
                size: 'big',
                type: 'dog',
              },
            ],
          },
        },
      },
    })

    const response = await request(app.server)
      .get('/pets')
      .query({
        city: 'Boa viagem',
      })
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.pets).toHaveLength(2)
  })
})
