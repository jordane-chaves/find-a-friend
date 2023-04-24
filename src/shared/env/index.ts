import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  JWT_SECRET: z.string(),
})

const envParsed = envSchema.safeParse(process.env)

if (envParsed.success === false) {
  throw new Error('⚠️ Invalid environment variables!')
}

export const env = envParsed.data
