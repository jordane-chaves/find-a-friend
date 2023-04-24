import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { ResourceNotFoundError } from '@/application/pets/use-cases/errors/resource-not-found-error'
import { makeGetPetUseCase } from '@/application/pets/use-cases/factories/make-get-pet-use-case'

import { PetViewModel } from '../../view-models/pet-view-model'

export async function getPet(request: FastifyRequest, reply: FastifyReply) {
  const getPetParamsSchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = getPetParamsSchema.parse(request.params)

  try {
    const getPetUseCase = makeGetPetUseCase()

    const { pet } = await getPetUseCase.execute({ petId: id })

    return reply.status(200).send({ pet: PetViewModel.toHTTP(pet) })
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(400).send({ message: error.message })
    }

    throw error
  }
}
