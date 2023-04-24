import { Pet } from '@/application/pets/entities/pet'
import {
  FindManyData,
  PetsRepository,
} from '@/application/pets/repositories/pets-repository'

import { prisma } from '..'

import { PrismaPetMapper } from '../mappers/prisma-pet-mapper'

export class PrismaPetsRepository implements PetsRepository {
  async findById(id: string) {
    const pet = await prisma.pet.findUnique({
      where: { id },
      include: {
        adoptionRequirements: true,
        images: true,
        org: true,
      },
    })

    if (!pet) {
      return null
    }

    return PrismaPetMapper.toDomain(pet)
  }

  async findMany(data: FindManyData) {
    const { city, age, energy, independence, size } = data

    const pets = await prisma.pet.findMany({
      where: {
        AND: [
          { org: { city } },
          { OR: [{ age }, { energy }, { independence }, { size }] },
        ],
      },
      include: {
        adoptionRequirements: true,
        images: true,
      },
    })

    return pets.map(PrismaPetMapper.toDomain)
  }

  async create(pet: Pet) {
    await prisma.pet.create({
      data: PrismaPetMapper.toPrisma(pet),
    })
  }
}
