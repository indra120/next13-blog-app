'use client'

import { signIn } from 'next-auth/react'
import { usePathname, useSearchParams } from 'next/navigation'
import { register } from '@app/actions'

const AuthSubmit = () => {
  const params = useSearchParams()
  const pathname=usePathname()

  return (
    <button
      type="submit"
      formAction={async (data) => {
        if (pathname === 'register') {
          await register(data)
        }

        await signIn('credentials', {
          name: data.get('name'),
          password: data.get('password'),
          callbackUrl: params.get('callbackUrl') || undefined,
        })
      }}
    >
      {pathname === 'register'? 'Register' : 'Login'}
    </button>
  )
}

export default AuthSubmit
