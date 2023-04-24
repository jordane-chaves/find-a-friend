import { Pet } from '../entities/pet'
import { PetsRepository } from '../repositories/pets-repository'

interface FetchPetsUseCaseRequest {
  city: string
  age?: 'cub' | 'adolescent' | 'elderly'
  size?: 'small' | 'medium' | 'big'
  independence?: 'low' | 'medium' | 'high'
  energy?: number
}

interface FetchPetsUseCaseResponse {
  pets: Pet[]
}

export class FetchPetsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute(
    request: FetchPetsUseCaseRequest,
  ): Promise<FetchPetsUseCaseResponse> {
    const { city, age, size, energy, independence } = request

    const pets = await this.petsRepository.findMany({
      city,
      age,
      size,
      energy,
      independence,
    })

    return { pets }
  }
}
