import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@lib'
import type { Layout } from '@types'

const AuthLayout: Layout = async (props) => {
  const session = await getServerSession(authOptions)
  if (session?.user?.name) redirect('/')

  return <>{props.children}</>
}

export default AuthLayout
