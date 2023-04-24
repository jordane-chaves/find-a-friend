import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '../../app'

describe('Register Org (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register an org', async () => {
    const response = await request(app.server).post('/orgs').send({
      name: 'Seu Cãopanheiro',
      email: 'contato@caopanheiro.com',
      phone: '5537123456789',
      password: '123456',
      passwordConfirm: '123456',
      address: 'Rua do meio, 123',
      city: 'Boa viagem',
      cep: '01234-500',
    })

    expect(response.statusCode).toEqual(201)
  })
})
