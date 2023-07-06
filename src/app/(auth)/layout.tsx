import { redirect } from 'next/navigation'
import { getSession } from '@lib'
import type { Layout } from '@types'

const AuthLayout: Layout = async (props) => {
  const session = await getSession()
  if (session) redirect('/')

  return <>{props.children}</>
}

export default AuthLayout
