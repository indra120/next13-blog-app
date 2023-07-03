import { getServerSession } from 'next-auth'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import style from '@styles/header.module.css'

const Logout = dynamic(() => import('./Logout'))

const Header = async () => {
  const session = await getServerSession()

  return (
    <header className={style.header}>
      <Link href="/" className={style.logo}>MyBlog</Link>

      <nav className={style.nav}>
        {session ? (
          <>
            <Link href="/post/create">Create new post</Link>
            <Logout username={session.user?.name!} />
          </>
        ) : (
          <>
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  )
}

export default Header
