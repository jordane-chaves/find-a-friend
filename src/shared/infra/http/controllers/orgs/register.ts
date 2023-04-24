import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { OrgAlreadyExistsError } from '@/application/orgs/use-cases/errors/org-already-exists-error'
import { makeRegisterOrgUseCase } from '@/application/orgs/use-cases/factories/make-register-org-use-case'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    phone: z.string().length(13),
    password: z.string().min(6),
    passwordConfirm: z.string().min(6),
    address: z.string(),
    city: z.string(),
    cep: z.string().regex(/^\d{5}-?\d{3}$/, 'Invalid CEP format!'),
  })

  const { name, email, phone, password, passwordConfirm, address, city, cep } =
    registerBodySchema.parse(request.body)

  if (password !== passwordConfirm) {
    return reply.status(400).send({
      message: 'Passwords do not match!',
    })
  }

  try {
    const registerOrgUseCase = makeRegisterOrgUseCase()

    await registerOrgUseCase.execute({
      name,
      email,
      phone,
      password,
      address,
      city,
      cep,
    })

    return reply.status(201).send()
  } catch (error) {
    if (error instanceof OrgAlreadyExistsError) {
      return reply.status(400).send({
        message: error.message,
      })
    }

    throw error
  }
}
