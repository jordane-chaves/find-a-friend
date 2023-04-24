import { Org } from '../entities/org'

export interface OrgsRepository {
  findById(id: string): Promise<Org | null>
  findByEmail(email: string): Promise<Org | null>
  create(org: Org): Promise<void>
}
