import { PrismaOrgsRepository } from '@/shared/infra/database/prisma/repositories/prisma-orgs-repository'

import { RegisterOrgUseCase } from '../register-org'

export function makeRegisterOrgUseCase() {
  const orgsRepository = new PrismaOrgsRepository()
  const useCase = new RegisterOrgUseCase(orgsRepository)

  return useCase
}
