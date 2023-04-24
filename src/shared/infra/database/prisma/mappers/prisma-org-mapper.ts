import { Org } from '@/application/orgs/entities/org'
import { Org as RawOrg } from '@prisma/client'

export class PrismaOrgMapper {
  static toPrisma(org: Org): RawOrg {
    return {
      id: org.id,
      name: org.name,
      email: org.email,
      password_hash: org.passwordHash,
      phone: org.phone,
      address: org.address,
      city: org.city,
      cep: org.cep,
    }
  }

  static toDomain(raw: RawOrg): Org {
    return Org.create(
      {
        name: raw.name,
        email: raw.email,
        passwordHash: raw.password_hash,
        phone: raw.phone,
        address: raw.address,
        city: raw.city,
        cep: raw.cep,
      },
      raw.id,
    )
  }
}
