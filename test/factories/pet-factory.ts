import { Pet, PetProps } from '@/application/pets/entities/pet'
import { Replace } from '@/core/replace'

type Override = Partial<Replace<PetProps, { energy: number }>>

export function makePet(override: Override = {}) {
  const pet = Pet.create({
    orgId: 'example-org-id',
    name: 'Alfredo',
    description:
      'Eu sou um lindo doguinho de 3 anos, um jovem brincalhão que adora fazer companhia, uma bagunça mas também ama uma soneca.',
    age: 'cub',
    independence: 'medium',
    energy: 4,
    size: 'small',
    type: 'dog',
    adoptionRequirements: [],
    images: [],
    ...override,
  })

  return pet
}
