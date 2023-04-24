import { PetAgeDTO } from '@/application/pets/dtos/pet-age-dto'
import { PetIndependenceDTO } from '@/application/pets/dtos/pet-independence-dto'
import { PetSizeDTO } from '@/application/pets/dtos/pet-size-dto'
import { PetTypeDTO } from '@/application/pets/dtos/pet-type-dto'
import { Pet } from '@/application/pets/entities/pet'
import { AdoptionRequirement, Pet as RawPet, Image, Org } from '@prisma/client'

import { PrismaOrgMapper } from './prisma-org-mapper'

type RawPetRelation = RawPet & {
  adoptionRequirements: AdoptionRequirement[]
  images: Image[]
  org?: Org
}

export class PrismaPetMapper {
  static toPrisma(pet: Pet) {
    return {
      id: pet.id,
      orgId: pet.orgId,
      name: pet.name,
      description: pet.description,
      energy: pet.energy,
      age: pet.age,
      size: pet.size,
      independence: pet.independence,
      type: pet.type,
      adoptionRequirements: {
        createMany: {
          data: pet.adoptionRequirements.map((requirement) => ({
            requirement,
          })),
        },
      },
      images: {
        createMany: {
          data: pet.images.map((file) => ({ file })),
        },
      },
    }
  }

  static toDomain(raw: RawPetRelation): Pet {
    const adoptionRequirements = raw.adoptionRequirements.map(
      (item) => item.requirement,
    )

    const images = raw.images.map((item) => item.file)

    return Pet.create(
      {
        orgId: raw.orgId,
        name: raw.name,
        description: raw.description,
        energy: raw.energy,
        age: raw.age as PetAgeDTO,
        size: raw.size as PetSizeDTO,
        independence: raw.independence as PetIndependenceDTO,
        type: raw.type as PetTypeDTO,
        adoptionRequirements,
        images,
        org: raw.org ? PrismaOrgMapper.toDomain(raw.org) : undefined,
      },
      raw.id,
    )
  }
}
