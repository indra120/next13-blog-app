import { getServerSession } from 'next-auth'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { authOptions } from '@lib'
import style from '@styles/header.module.css'

const Logout = dynamic(() => import('./Logout'))

const Header = async () => {
  const session = await getServerSession(authOptions)

  return (
    <header className={style.header}>
      <Link href="/" className={style.logo}>
        MyBlog
      </Link>

      <nav className={style.nav}>
        {session ? (
          <>
            <Link href="/post/create">Create new post</Link>
            <Logout username={session.user?.name!} />
          </>
        ) : (
          <>
            <Link href="/auth?mode=login">Login</Link>
            <Link href="/auth?mode=register">Register</Link>
          </>
        )}
      </nav>
    </header>
  )
}

export default Header
