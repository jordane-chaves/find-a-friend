import { hash } from 'bcryptjs'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { prisma } from '@/shared/infra/database/prisma'
import { makePet } from '@/test/factories/pet-factory'

import { app } from '../../app'

describe('Fetch Pets (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get many pets', async () => {
    const pet = makePet()

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
                id: pet.id,
                name: pet.name,
                description: pet.description,
                age: pet.age,
                independence: pet.independence,
                energy: pet.energy,
                size: pet.size,
                type: pet.type,
              },
            ],
          },
        },
      },
    })

    const response = await request(app.server).get(`/pets/${pet.id}`).send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.pet.org).not.toHaveProperty('passwordHash')
    expect(response.body.pet).toEqual(
      expect.objectContaining({
        id: pet.id,
        name: pet.name,
        description: pet.description,
        age: pet.age,
        independence: pet.independence,
        energy: pet.energy,
        size: pet.size,
        type: pet.type,
        adoptionRequirements: pet.adoptionRequirements,
        images: pet.images,
        org: expect.objectContaining({
          phone: '5537123456789',
        }),
      }),
    )
  })
})
