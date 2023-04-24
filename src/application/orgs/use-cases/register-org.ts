import { hash } from 'bcryptjs'

import { Org } from '../entities/org'
import { OrgsRepository } from '../repositories/orgs-repository'
import { OrgAlreadyExistsError } from './errors/org-already-exists-error'

interface RegisterOrgUseCaseRequest {
  name: string
  email: string
  phone: string
  password: string
  address: string
  city: string
  cep: string
}

interface RegisterOrgUseCaseResponse {
  org: Org
}

export class RegisterOrgUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute(
    request: RegisterOrgUseCaseRequest,
  ): Promise<RegisterOrgUseCaseResponse> {
    const { name, email, password, phone, address, city, cep } = request

    const orgAlreadyExists = await this.orgsRepository.findByEmail(email)

    if (orgAlreadyExists) {
      throw new OrgAlreadyExistsError()
    }

    const passwordHash = await hash(password, 6)

    const org = Org.create({
      name,
      email,
      passwordHash,
      phone,
      address,
      city,
      cep,
    })

    await this.orgsRepository.create(org)

    return { org }
  }
}
