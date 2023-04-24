import { Pet } from '../entities/pet'

export interface FindManyData {
  city: string
  age?: 'cub' | 'adolescent' | 'elderly'
  size?: 'small' | 'medium' | 'big'
  independence?: 'low' | 'medium' | 'high'
  energy?: number
}

export interface PetsRepository {
  findById(id: string): Promise<Pet | null>
  findMany(data: FindManyData): Promise<Pet[]>
  create(pet: Pet): Promise<void>
}
