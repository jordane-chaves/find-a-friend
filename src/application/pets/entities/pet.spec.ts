import { describe, expect, it } from 'vitest'

import { makePet } from '@/test/factories/pet-factory'

import { Pet } from './pet'

describe('Pet', () => {
  it('should be able to create a pet', () => {
    const pet = Pet.create(makePet())

    expect(pet).toBeTruthy()
    expect(pet.id).toEqual(expect.any(String))
  })
})
