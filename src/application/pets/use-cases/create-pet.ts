import { OrgsRepository } from '@/application/orgs/repositories/orgs-repository'

import { Pet } from '../entities/pet'
import { PetsRepository } from '../repositories/pets-repository'
import { ImagesLengthError } from './errors/images-length-error'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface CreatePetUseCaseRequest {
  orgId: string
  name: string
  description: string
  energy: number
  age: 'cub' | 'adolescent' | 'elderly'
  size: 'small' | 'medium' | 'big'
  independence: 'low' | 'medium' | 'high'
  type: 'cat' | 'dog'
  adoptionRequirements: string[]
  images: string[]
}

interface CreatePetUseCaseResponse {
  pet: Pet
}

export class CreatePetUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private orgsRepository: OrgsRepository,
  ) {}

  async execute(
    request: CreatePetUseCaseRequest,
  ): Promise<CreatePetUseCaseResponse> {
    const {
      orgId,
      name,
      description,
      energy,
      age,
      size,
      independence,
      type,
      adoptionRequirements,
      images,
    } = request

    const org = await this.orgsRepository.findById(orgId)

    if (!org) {
      throw new ResourceNotFoundError()
    }

    if (images.length === 0 || images.length > 6) {
      throw new ImagesLengthError()
    }

    const pet = Pet.create({
      orgId,
      name,
      description,
      energy,
      age,
      size,
      independence,
      type,
      adoptionRequirements,
      images,
    })

    await this.petsRepository.create(pet)

    return { pet }
  }
}
