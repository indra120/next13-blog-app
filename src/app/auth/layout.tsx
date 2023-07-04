import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import type { Layout } from '@types'

const AuthLayout: Layout = async (props) => {
  const session = await getServerSession()
  if (session?.user?.name) redirect('/')

  return <>{props.children}</>
}

export default AuthLayout
