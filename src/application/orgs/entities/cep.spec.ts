import { describe, expect, it } from 'vitest'

import { Cep } from './cep'

describe('Org cep', () => {
  it('should be able to create a org cep with hyphen', () => {
    const cep = new Cep('12345-000')
    expect(cep).toBeTruthy()
  })

  it('should be able to create a org cep with just numbers', () => {
    const cep = new Cep('12345000')
    expect(cep).toBeTruthy()
  })

  it('should not be able to create a org cep with more than 8 numbers', () => {
    expect(() => new Cep('0'.repeat(9))).toThrow()
  })

  it('should not be able to create a org cep with less than 8 numbers', () => {
    expect(() => new Cep('0'.repeat(7))).toThrow()
  })

  it('should not be able to create a org cep with hyphen and more than 9 characters', () => {
    expect(() => new Cep('12345-6789')).toThrow()
  })

  it('should not be able to create a org cep with hyphen and less than 9 characters', () => {
    expect(() => new Cep('1234-5')).toThrow()
  })
})
