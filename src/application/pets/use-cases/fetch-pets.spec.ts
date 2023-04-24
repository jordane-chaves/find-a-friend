import { beforeEach, describe, expect, it } from 'vitest'

import { makeOrg } from '@/test/factories/org-factory'
import { makePet } from '@/test/factories/pet-factory'
import { InMemoryPetsRepository } from '@/test/repositories/in-memory-pets-repository'

import { FetchPetsUseCase } from './fetch-pets'

let sut: FetchPetsUseCase
let inMemoryPetsRepository: InMemoryPetsRepository

describe('Fetch Pets Use Case', () => {
  beforeEach(() => {
    inMemoryPetsRepository = new InMemoryPetsRepository()

    sut = new FetchPetsUseCase(inMemoryPetsRepository)
  })

  it('should be able to list pets by city', async () => {
    const firstOrg = makeOrg({ city: 'City 01' })
    const secondOrg = makeOrg({ city: 'City 02' })

    for (let i = 0; i < 2; i++) {
      inMemoryPetsRepository.items.push(
        makePet({ orgId: firstOrg.id, org: firstOrg }),
      )
    }

    for (let i = 0; i < 3; i++) {
      inMemoryPetsRepository.items.push(
        makePet({ orgId: secondOrg.id, org: secondOrg }),
      )
    }

    const { pets } = await sut.execute({ city: 'City 01' })

    expect(pets).toHaveLength(2)
  })

  it('should be able to list pets by age', async () => {
    const firstOrg = makeOrg({ city: 'City 01' })

    for (let i = 0; i < 2; i++) {
      inMemoryPetsRepository.items.push(
        makePet({ orgId: firstOrg.id, org: firstOrg, age: 'adolescent' }),
      )
    }

    for (let i = 0; i < 3; i++) {
      inMemoryPetsRepository.items.push(
        makePet({ orgId: firstOrg.id, org: firstOrg, age: 'cub' }),
      )
    }

    const { pets } = await sut.execute({ city: 'City 01', age: 'adolescent' })

    expect(pets).toHaveLength(2)
  })

  it('should be able to list pets by size', async () => {
    const firstOrg = makeOrg({ city: 'City 01' })

    for (let i = 0; i < 2; i++) {
      inMemoryPetsRepository.items.push(
        makePet({ orgId: firstOrg.id, org: firstOrg, size: 'small' }),
      )
    }

    for (let i = 0; i < 3; i++) {
      inMemoryPetsRepository.items.push(
        makePet({ orgId: firstOrg.id, org: firstOrg, size: 'big' }),
      )
    }

    const { pets } = await sut.execute({ city: 'City 01', size: 'small' })

    expect(pets).toHaveLength(2)
  })

  it('should be able to list pets by energy level', async () => {
    const firstOrg = makeOrg({ city: 'City 01' })

    for (let i = 0; i < 2; i++) {
      inMemoryPetsRepository.items.push(
        makePet({ orgId: firstOrg.id, org: firstOrg, energy: 3 }),
      )
    }

    for (let i = 0; i < 3; i++) {
      inMemoryPetsRepository.items.push(
        makePet({ orgId: firstOrg.id, org: firstOrg, energy: 5 }),
      )
    }

    const { pets } = await sut.execute({ city: 'City 01', energy: 3 })

    expect(pets).toHaveLength(2)
  })

  it('should be able to list pets by independency', async () => {
    const firstOrg = makeOrg({ city: 'City 01' })

    for (let i = 0; i < 2; i++) {
      inMemoryPetsRepository.items.push(
        makePet({ orgId: firstOrg.id, org: firstOrg, independence: 'medium' }),
      )
    }

    for (let i = 0; i < 3; i++) {
      inMemoryPetsRepository.items.push(
        makePet({ orgId: firstOrg.id, org: firstOrg, independence: 'low' }),
      )
    }

    const { pets } = await sut.execute({
      city: 'City 01',
      independence: 'medium',
    })

    expect(pets).toHaveLength(2)
  })
})
