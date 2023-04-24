import { compare } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryOrgsRepository } from '@/test/repositories/in-memory-orgs-repository'

import { OrgAlreadyExistsError } from './errors/org-already-exists-error'
import { RegisterOrgUseCase } from './register-org'

let sut: RegisterOrgUseCase
let inMemoryOrgsRepository: InMemoryOrgsRepository

describe('Register Org Use Case', () => {
  beforeEach(() => {
    inMemoryOrgsRepository = new InMemoryOrgsRepository()

    sut = new RegisterOrgUseCase(inMemoryOrgsRepository)
  })

  it('should be able to register a new org', async () => {
    const { org } = await sut.execute({
      name: 'Seu Cãopanheiro',
      phone: '5537123456789',
      email: 'seucaopanheiro@example.com',
      password: '123456',
      address: 'Rua do meio, 123 , Boa viagem, Recife - PE',
      city: 'Boa viagem',
      cep: '12345000',
    })

    expect(inMemoryOrgsRepository.items).toHaveLength(1)
    expect(org.id).toEqual(expect.any(String))
  })

  it('should hashed org password upon registration', async () => {
    const { org } = await sut.execute({
      name: 'Seu Cãopanheiro',
      phone: '5537123456789',
      email: 'seucaopanheiro@example.com',
      password: '123456',
      address: 'Rua do meio, 123 , Boa viagem, Recife - PE',
      city: 'Boa viagem',
      cep: '12345000',
    })

    const isPasswordCorrectlyHashed = await compare('123456', org.passwordHash)

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register a org with same email twice', async () => {
    const email = 'seucaopanheiro@example.com'

    await sut.execute({
      email,
      name: 'Seu Cãopanheiro',
      phone: '5537123456789',
      password: '123456',
      address: 'Rua do meio, 123 , Boa viagem, Recife - PE',
      city: 'Boa viagem',
      cep: '12345000',
    })

    await expect(
      sut.execute({
        email,
        name: 'Seu Cãopanheiro',
        phone: '5537123456789',
        password: '123456',
        address: 'Rua do meio, 123 , Boa viagem, Recife - PE',
        city: 'Boa viagem',
        cep: '12345000',
      }),
    ).rejects.toBeInstanceOf(OrgAlreadyExistsError)
  })
})
