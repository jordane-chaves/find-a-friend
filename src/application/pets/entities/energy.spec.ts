import { describe, expect, it } from 'vitest'

import { Energy } from './energy'

describe('Pet energy', () => {
  it('should be able to create a pet energy', () => {
    const energy = new Energy(5)

    expect(energy).toBeTruthy()
  })

  it('should not be able to create a pet energy less than 1', () => {
    expect(() => new Energy(0)).toThrow()
  })

  it('should not be able to create a pet energy more than 5', () => {
    expect(() => new Energy(6)).toThrow()
  })
})
