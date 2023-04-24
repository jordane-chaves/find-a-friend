import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'

import { makeOrg } from '@/test/factories/org-factory'
import { InMemoryOrgsRepository } from '@/test/repositories/in-memory-orgs-repository'

import { AuthenticateUseCase } from './authenticate'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let sut: AuthenticateUseCase
let inMemoryOrgsRepository: InMemoryOrgsRepository

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    inMemoryOrgsRepository = new InMemoryOrgsRepository()

    sut = new AuthenticateUseCase(inMemoryOrgsRepository)
  })

  it('should be able to register a new org', async () => {
    const createdOrg = makeOrg({ passwordHash: await hash('123456', 6) })
    inMemoryOrgsRepository.items.push(createdOrg)

    const { org } = await sut.execute({
      email: 'seucaopanheiro@example.com',
      password: '123456',
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    await expect(
      sut.execute({
        email: 'seucaopanheiro@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    const createdOrg = makeOrg({ passwordHash: await hash('123456', 6) })
    inMemoryOrgsRepository.items.push(createdOrg)

    await expect(
      sut.execute({
        email: 'seucaopanheiro@example.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
