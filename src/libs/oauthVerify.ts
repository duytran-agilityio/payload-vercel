import type { VerifyFunction } from '@payloadcms/plugin-oauth2/types'

import { env } from './env'
import type { User } from '@/payload-types'

type OAuthUser = {
  _strategy?: string
  collection: 'users'
  exp?: number
} & User

/**
 * Custom OAuth2 verify function that restricts login to allowed email domains.
 * Domains are configured via ALLOWED_EMAIL_DOMAINS environment variable.
 * Format: comma-separated list (e.g., "battalion.gold,tcnetwork.com,battalionmetals.com")
 */
export const oauthVerify: VerifyFunction = async ({ payload, token }) => {
  const tokenUsername = 'email'
  const email = token[tokenUsername] as string | undefined

  if (!email) {
    payload.logger.warn('OAuth login attempted without email in token')
    return { user: null }
  }

  // Validate email domain against allowed list
  const allowedDomains = env.ALLOWED_EMAIL_DOMAINS?.split(',')
    .map((d) => d.trim().toLowerCase())
    .filter(Boolean)

  if (allowedDomains && allowedDomains.length > 0) {
    const emailDomain = email.split('@')[1]?.toLowerCase()

    if (!emailDomain || !allowedDomains.includes(emailDomain)) {
      payload.logger.warn({
        emailDomain,
        allowedDomains,
        msg: `OAuth login rejected: email domain not allowed`,
      })
      return { user: null }
    }
  }

  let user: OAuthUser | null = null

  try {
    const results = await payload.find({
      collection: 'users',
      depth: 0,
      limit: 1,
      pagination: false,
      where: {
        [tokenUsername]: { equals: email },
      },
    })

    if (results.docs.length > 0) {
      user = results.docs[0] as OAuthUser

      // Update user with new token data if changed
      if (hasUserTokenPropsChanged(user, token)) {
        user = (await payload.update({
          id: user.id,
          collection: 'users',
          data: {
            ...(token as Record<string, unknown>),
          },
          depth: 0,
        })) as OAuthUser
      }
    } else {
      // Create new user
      const newUser = {
        [tokenUsername]: email,
        ...token,
      }

      user = (await payload.create({
        collection: 'users',
        data: newUser,
        depth: 0,
      })) as OAuthUser
    }
  } catch (err: unknown) {
    payload.logger.error({
      err,
      msg: 'Error verifying OAuth user',
    })
    return { user: null }
  }

  if (user) {
    user.collection = 'users'
    user._strategy = 'oauth'
    user.exp = token.exp as number | undefined

    return { user }
  }

  return { user: null }
}

function hasUserTokenPropsChanged(
  user: OAuthUser,
  token: Record<string, unknown>,
): boolean {
  const userRecord = user as unknown as Record<string, unknown>
  for (const key in userRecord) {
    if (userRecord[key] && token[key]) {
      if (compareValues(userRecord[key], token[key])) {
        return true
      }
    }
  }
  return false
}

function compareValues(userVal: unknown, tokenVal: unknown): boolean {
  if (Array.isArray(userVal) && Array.isArray(tokenVal)) {
    return (
      userVal.some((val) => !tokenVal.includes(val)) ||
      tokenVal.some((val) => !userVal.includes(val))
    )
  }
  return userVal !== tokenVal
}
