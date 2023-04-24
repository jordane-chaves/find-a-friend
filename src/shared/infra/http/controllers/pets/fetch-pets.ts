import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeFetchPetsUseCase } from '@/application/pets/use-cases/factories/make-fetch-pets-use-case'

import { PetViewModel } from '../../view-models/pet-view-model'

export async function fetchPets(request: FastifyRequest, reply: FastifyReply) {
  const fetchPetsQuerySchema = z.object({
    city: z.string(),
    age: z.enum(['cub', 'adolescent', 'elderly']).optional(),
    size: z.enum(['small', 'medium', 'big']).optional(),
    independence: z.enum(['low', 'medium', 'high']).optional(),
    energy: z.number().min(1).max(5).optional(),
  })

  const { city, age, energy, independence, size } = fetchPetsQuerySchema.parse(
    request.query,
  )

  const fetchPetsUseCase = makeFetchPetsUseCase()

  const { pets } = await fetchPetsUseCase.execute({
    city,
    age,
    energy,
    independence,
    size,
  })

  return reply.status(200).send({ pets: pets.map(PetViewModel.toHTTP) })
}
