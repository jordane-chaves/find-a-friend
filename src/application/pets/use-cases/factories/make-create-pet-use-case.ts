import { PrismaOrgsRepository } from '@/shared/infra/database/prisma/repositories/prisma-orgs-repository'
import { PrismaPetsRepository } from '@/shared/infra/database/prisma/repositories/prisma-pets-repository'

import { CreatePetUseCase } from '../create-pet'

export function makeCreatePetUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const orgsRepository = new PrismaOrgsRepository()

  const useCase = new CreatePetUseCase(petsRepository, orgsRepository)

  return useCase
}
