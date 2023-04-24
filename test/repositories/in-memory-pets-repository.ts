import { Pet } from '@/application/pets/entities/pet'
import {
  FindManyData,
  PetsRepository,
} from '@/application/pets/repositories/pets-repository'

export class InMemoryPetsRepository implements PetsRepository {
  items: Pet[] = []

  async findById(id: string): Promise<Pet | null> {
    const pet = this.items.find((item) => item.id === id)

    if (!pet) {
      return null
    }

    return pet
  }

  async findMany(data: FindManyData) {
    const { city, age, size, energy, independence } = data

    const pets = this.items.filter((item) => {
      if (!item.org) {
        return false
      }

      if (age) {
        return item.org.city === city && item.age === age
      }

      if (size) {
        return item.org.city === city && item.size === size
      }

      if (energy) {
        return item.org.city === city && item.energy === energy
      }

      if (independence) {
        return item.org.city === city && item.independence === independence
      }

      return item.org.city === city
    })

    return pets
  }

  async create(pet: Pet) {
    this.items.push(pet)
  }
}
