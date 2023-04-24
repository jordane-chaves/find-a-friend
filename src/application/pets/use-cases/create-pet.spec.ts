import { beforeEach, describe, expect, it } from 'vitest'

import { makeOrg } from '@/test/factories/org-factory'
import { InMemoryOrgsRepository } from '@/test/repositories/in-memory-orgs-repository'
import { InMemoryPetsRepository } from '@/test/repositories/in-memory-pets-repository'

import { CreatePetUseCase } from './create-pet'
import { ImagesLengthError } from './errors/images-length-error'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let sut: CreatePetUseCase
let inMemoryPetsRepository: InMemoryPetsRepository
let inMemoryOrgsRepository: InMemoryOrgsRepository

describe('Create Pet Use Case', () => {
  beforeEach(() => {
    inMemoryPetsRepository = new InMemoryPetsRepository()
    inMemoryOrgsRepository = new InMemoryOrgsRepository()

    sut = new CreatePetUseCase(inMemoryPetsRepository, inMemoryOrgsRepository)
  })

  it('should be able to create a new pet', async () => {
    const org = makeOrg()
    inMemoryOrgsRepository.items.push(org)

    const { pet } = await sut.execute({
      orgId: org.id,
      name: 'Alfredo',
      description: 'Exemplo de descrição do pet',
      age: 'cub',
      independence: 'medium',
      energy: 4,
      size: 'small',
      type: 'dog',
      adoptionRequirements: ['Ambiente frio, pois possui muito pelo'],
      images: ['image-01.jpg'],
    })

    expect(inMemoryPetsRepository.items).toHaveLength(1)
    expect(pet.id).toEqual(expect.any(String))
  })

  it('should a pet be linked to an org', async () => {
    const org = makeOrg()
    inMemoryOrgsRepository.items.push(org)

    const { pet } = await sut.execute({
      orgId: org.id,
      name: 'Alfredo',
      description: 'Exemplo de descrição do pet',
      age: 'cub',
      independence: 'medium',
      energy: 4,
      size: 'small',
      type: 'dog',
      adoptionRequirements: ['Ambiente frio, pois possui muito pelo'],
      images: ['image-01.jpg'],
    })

    expect(pet.orgId).toEqual(expect.any(String))
  })

  it('should a pet be able to have multiple adoption requirements', async () => {
    const org = makeOrg()
    inMemoryOrgsRepository.items.push(org)

    const { pet } = await sut.execute({
      orgId: org.id,
      name: 'Alfredo',
      description: 'Exemplo de descrição do pet',
      age: 'cub',
      independence: 'medium',
      energy: 4,
      size: 'small',
      type: 'dog',
      adoptionRequirements: [
        'Ambiente frio, pois possui muito pelo',
        'Proibido apartamento',
      ],
      images: ['image-01.jpg'],
    })

    expect(pet.adoptionRequirements).toHaveLength(2)
  })

  it('should not be able to create a pet without images', async () => {
    const org = makeOrg()
    inMemoryOrgsRepository.items.push(org)

    await expect(
      sut.execute({
        orgId: org.id,
        name: 'Alfredo',
        description: 'Exemplo de descrição do pet',
        age: 'cub',
        independence: 'medium',
        energy: 4,
        size: 'small',
        type: 'dog',
        adoptionRequirements: ['Ambiente frio, pois possui muito pelo'],
        images: [],
      }),
    ).rejects.toBeInstanceOf(ImagesLengthError)
  })

  it('should not be able to create a pet with more then 6 images', async () => {
    const org = makeOrg()
    inMemoryOrgsRepository.items.push(org)

    await expect(
      sut.execute({
        orgId: org.id,
        name: 'Alfredo',
        description: 'Exemplo de descrição do pet',
        age: 'cub',
        independence: 'medium',
        energy: 4,
        size: 'small',
        type: 'dog',
        adoptionRequirements: ['Ambiente frio, pois possui muito pelo'],
        images: [
          'image-01.jpg',
          'image-02.jpg',
          'image-03.jpg',
          'image-04.jpg',
          'image-05.jpg',
          'image-06.jpg',
          'image-07.jpg',
        ],
      }),
    ).rejects.toBeInstanceOf(ImagesLengthError)
  })

  it('should not be able to create a pet with a non-existent org', async () => {
    await expect(
      sut.execute({
        orgId: 'non-existent-org-id',
        name: 'Alfredo',
        description: 'Exemplo de descrição do pet',
        age: 'cub',
        independence: 'medium',
        energy: 4,
        size: 'small',
        type: 'dog',
        adoptionRequirements: ['Ambiente frio, pois possui muito pelo'],
        images: ['image-01.jpg'],
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
