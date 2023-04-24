import { PrismaPetsRepository } from '@/shared/infra/database/prisma/repositories/prisma-pets-repository'

import { GetPetUseCase } from '../get-pet'

export function makeGetPetUseCase() {
  const petsRepository = new PrismaPetsRepository()

  const useCase = new GetPetUseCase(petsRepository)

  return useCase
}
