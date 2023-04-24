import { Replace } from '@/core/replace'

import { Org, OrgProps } from '../../src/application/orgs/entities/org'

type Override = Partial<Replace<OrgProps, { cep: string }>>

export function makeOrg(override: Override = {}) {
  return Org.create({
    name: 'Seu Cãopanheiro',
    phone: '5537123456789',
    email: 'seucaopanheiro@example.com',
    passwordHash: 'example-password-hash',
    address: 'Rua do meio, 123, Boa viagem, Recife - PE',
    city: 'Boa viagem',
    cep: '12345000',
    ...override,
  })
}
