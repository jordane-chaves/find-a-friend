import 'fastify'

interface Files {
  filename: string
}

declare module 'fastify' {
  export interface FastifyRequest {
    files: Files[]
  }
}
