import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '../../app'

describe('Authenticate Org (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to authenticate an org', async () => {
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

    const response = await request(app.server).post('/sessions').send({
      email: 'contato@caopanheiro.com',
      password: '123456',
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual(
      expect.objectContaining({
        token: expect.any(String),
      }),
    )
  })
})
