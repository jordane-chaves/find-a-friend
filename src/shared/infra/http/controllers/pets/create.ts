import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { ImagesLengthError } from '@/application/pets/use-cases/errors/images-length-error'
import { ResourceNotFoundError } from '@/application/pets/use-cases/errors/resource-not-found-error'
import { makeCreatePetUseCase } from '@/application/pets/use-cases/factories/make-create-pet-use-case'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createBodySchema = z.object({
    name: z.string(),
    description: z.string(),
    energy: z.coerce.number().min(1).max(5),
    age: z.enum(['cub', 'adolescent', 'elderly']),
    size: z.enum(['small', 'medium', 'big']),
    independence: z.enum(['low', 'medium', 'high']),
    type: z.enum(['cat', 'dog']),
    adoptionRequirements: z.array(z.string()),
  })

  const uploadImagesSchema = z.array(
    z.object({
      filename: z.string(),
    }),
  )

  const {
    name,
    description,
    energy,
    age,
    size,
    independence,
    type,
    adoptionRequirements,
  } = createBodySchema.parse(request.body)

  const files = uploadImagesSchema.parse(request.files)

  try {
    const createPetUseCase = makeCreatePetUseCase()

    const images = files.map((file) => file.filename)

    await createPetUseCase.execute({
      orgId: request.user.sub,
      name,
      description,
      energy,
      age,
      size,
      independence,
      type,
      adoptionRequirements,
      images,
    })

    return reply.status(201).send()
  } catch (error) {
    if (
      error instanceof ResourceNotFoundError ||
      error instanceof ImagesLengthError
    ) {
      return reply.status(400).send({ message: error.message })
    }

    throw error
  }
}
