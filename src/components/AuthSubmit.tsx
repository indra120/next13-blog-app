'use client'

import { signIn } from 'next-auth/react'
import { useSearchParams }from 'next/navigation'
import { register } from '@app/actions'

interface Props{
  page: 'Login' | 'Register'
}

const AuthSubmit:React.FC<Props> = (props) => {
  // const params = useSearchParams()

  return (
    <button
      type="submit"
      formAction={async (data) => {
        if (props.page === 'Register') {
          await register(data)
        }

        await signIn('credentials', {
          name: data.get('name'),
          password: data.get('password'),
          redirect: true,
          callbackUrl: '/'
        })
      }}
    >
      {props.page}
    </button>
  )
}

export default AuthSubmit
