'use client'

import { signIn } from 'next-auth/react'
import { useSearchParams }from 'next/navigation'
import { register } from '@app/actions'

const AuthSubmit = () => {
  const params = useSearchParams()

  return (
    <button
      type="submit"
      formAction={async (data) => {
        try {
          if (params.get('mode') === 'register') {
            await register(data)
          }

          await signIn('credentials', {
            name: data.get('name'),
            password: data.get('password'),
            redirect: true,
          })
        } catch (error) {
          // @ts-ignore
          throw Error(`Failed to ${params.get('mode')}: ${error?.message}`)
        }
      }}
    >
      {params.get('mode') === 'register'? 'Register' : 'Login'}
    </button>
  )
}

export default AuthSubmit
