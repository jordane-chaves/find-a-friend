import { PrismaOrgsRepository } from '@/shared/infra/database/prisma/repositories/prisma-orgs-repository'

import { AuthenticateUseCase } from '../authenticate'

export function makeAuthenticateUseCase() {
  const orgsRepository = new PrismaOrgsRepository()
  const useCase = new AuthenticateUseCase(orgsRepository)

  return useCase
}
