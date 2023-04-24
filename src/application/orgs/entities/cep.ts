export class Cep {
  private readonly cep: string

  get value() {
    return this.cep
  }

  private validateCepFormat(cep: string) {
    return /^\d{5}-?\d{3}$/.test(cep)
  }

  private sanitizeCep(cep: string) {
    return cep.replace(/\D+/g, '')
  }

  constructor(cep: string) {
    const isValidCepFormat = this.validateCepFormat(cep)

    if (!isValidCepFormat) {
      throw new Error('Invalid CEP format.')
    }

    this.cep = this.sanitizeCep(cep)
  }
}
