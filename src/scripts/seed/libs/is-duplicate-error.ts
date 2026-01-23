import { z } from 'zod'
const PayloadErrorSchema = z.object({
  name: z.string(),
  status: z.number(),
  data: z.object({
    collection: z.string(),
    errors: z.array(z.object({ message: z.string(), path: z.string() })),
  }),
})

type PayloadErrorLike = z.infer<typeof PayloadErrorSchema>

export function isPayloadError(error: unknown): error is PayloadErrorLike {
  return PayloadErrorSchema.safeParse(error).success
}

export function isDuplicateError(error: unknown, field: string): boolean {
  return (
    isPayloadError(error) &&
    error.data.errors.some(
      (error) => error.path === field && /already registered/.test(error.message),
    )
  )
}
