import { describe, expect, it } from 'vitest'

import { Org } from './org'

describe('Org', () => {
  it('should be able to create a org', async () => {
    const org = Org.create({
      name: 'Seu Cãopanheiro',
      phone: '5537123456789',
      email: 'seucaopanheiro@example.com',
      passwordHash: 'example-password-hash',
      address: 'Rua do meio, 123, Boa viagem, Recife - PE',
      city: 'Boa viagem',
      cep: '12345000',
    })

    expect(org).toBeTruthy()
    expect(org.id).toEqual(expect.any(String))
  })
})
