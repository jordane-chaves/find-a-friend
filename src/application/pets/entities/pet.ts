import { Org } from '@/application/orgs/entities/org'
import { Entity } from '@/core/entity'
import { Replace } from '@/core/replace'

import { PetAgeDTO } from '../dtos/pet-age-dto'
import { PetIndependenceDTO } from '../dtos/pet-independence-dto'
import { PetSizeDTO } from '../dtos/pet-size-dto'
import { PetTypeDTO } from '../dtos/pet-type-dto'
import { Energy } from './energy'

export interface PetProps {
  orgId: string
  name: string
  description: string
  energy: Energy
  age: PetAgeDTO
  size: PetSizeDTO
  independence: PetIndependenceDTO
  type: PetTypeDTO
  adoptionRequirements: string[]
  images: string[]

  org?: Org
}

export class Pet extends Entity<PetProps> {
  get orgId() {
    return this.props.orgId
  }

  get name() {
    return this.props.name
  }

  get description() {
    return this.props.description
  }

  get energy() {
    return this.props.energy.value
  }

  get age() {
    return this.props.age
  }

  get size() {
    return this.props.size
  }

  get independence() {
    return this.props.independence
  }

  get type() {
    return this.props.type
  }

  get adoptionRequirements() {
    return this.props.adoptionRequirements
  }

  get images() {
    return this.props.images
  }

  get org() {
    return this.props.org
  }

  static create(props: Replace<PetProps, { energy: number }>, id?: string) {
    const pet = new Pet({ ...props, energy: new Energy(props.energy) }, id)

    return pet
  }
}
