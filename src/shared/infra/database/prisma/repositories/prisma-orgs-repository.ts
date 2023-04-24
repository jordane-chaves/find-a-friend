import { Org } from '@/application/orgs/entities/org'
import { OrgsRepository } from '@/application/orgs/repositories/orgs-repository'

import { prisma } from '..'

import { PrismaOrgMapper } from '../mappers/prisma-org-mapper'

export class PrismaOrgsRepository implements OrgsRepository {
  async findById(id: string) {
    const org = await prisma.org.findUnique({ where: { id } })

    if (!org) {
      return null
    }

    return PrismaOrgMapper.toDomain(org)
  }

  async findByEmail(email: string) {
    const org = await prisma.org.findUnique({ where: { email } })

    if (!org) {
      return null
    }

    return PrismaOrgMapper.toDomain(org)
  }

  async create(org: Org) {
    await prisma.org.create({
      data: PrismaOrgMapper.toPrisma(org),
    })
  }
}
