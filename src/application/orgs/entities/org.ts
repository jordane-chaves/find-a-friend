import { Entity } from '@/core/entity'
import { Replace } from '@/core/replace'

import { Cep } from './cep'

export interface OrgProps {
  name: string
  email: string
  phone: string
  passwordHash: string
  address: string
  city: string
  cep: Cep
}

export class Org extends Entity<OrgProps> {
  get name() {
    return this.props.name
  }

  get email() {
    return this.props.email
  }

  get phone() {
    return this.props.phone
  }

  get passwordHash() {
    return this.props.passwordHash
  }

  get address() {
    return this.props.address
  }

  get city() {
    return this.props.city
  }

  get cep() {
    return this.props.cep.value
  }

  static create(props: Replace<OrgProps, { cep: string }>, id?: string) {
    const org = new Org({ ...props, cep: new Cep(props.cep) }, id)

    return org
  }
}
