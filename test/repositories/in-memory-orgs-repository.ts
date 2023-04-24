import { Org } from '../../src/application/orgs/entities/org'
import { OrgsRepository } from '../../src/application/orgs/repositories/orgs-repository'

export class InMemoryOrgsRepository implements OrgsRepository {
  items: Org[] = []

  async findById(id: string) {
    const org = this.items.find((item) => item.id === id)

    if (!org) {
      return null
    }

    return org
  }

  async findByEmail(email: string) {
    const org = this.items.find((item) => item.email === email)

    if (!org) {
      return null
    }

    return org
  }

  async create(org: Org) {
    this.items.push(org)
  }
}
