import { beforeEach, describe, expect, it } from 'vitest'

import { makeOrg } from '@/test/factories/org-factory'
import { makePet } from '@/test/factories/pet-factory'
import { InMemoryPetsRepository } from '@/test/repositories/in-memory-pets-repository'

import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { GetPetUseCase } from './get-pet'

let sut: GetPetUseCase
let inMemoryPetsRepository: InMemoryPetsRepository

describe('Get Pet Use Case', () => {
  beforeEach(() => {
    inMemoryPetsRepository = new InMemoryPetsRepository()

    sut = new GetPetUseCase(inMemoryPetsRepository)
  })

  it('should be able to get a pet', async () => {
    const createdPet = makePet()
    inMemoryPetsRepository.items.push(createdPet)

    const { pet } = await sut.execute({ petId: createdPet.id })

    expect(pet.id).toEqual(expect.any(String))
  })

  it('should not be able to get a non-existent pet', async () => {
    await expect(
      sut.execute({ petId: 'non-existent-pet-id' }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should be able to get org info when get a pet', async () => {
    const org = makeOrg()
    const createdPet = makePet({ orgId: org.id, org })
    inMemoryPetsRepository.items.push(createdPet)

    const { pet } = await sut.execute({ petId: createdPet.id })

    expect(pet.org).toEqual(
      expect.objectContaining({
        id: org.id,
        name: org.name,
        phone: org.phone,
        email: org.email,
        address: org.address,
        city: org.city,
        cep: org.cep,
      }),
    )
  })
})
