export class Energy {
  private readonly energy: number

  get value() {
    return this.energy
  }

  private validateEnergy(energy: number) {
    return energy >= 1 && energy <= 5
  }

  constructor(energy: number) {
    const isValidEnergy = this.validateEnergy(energy)

    if (!isValidEnergy) {
      throw new Error('Energy level must be from 1 to 5')
    }

    this.energy = energy
  }
}
