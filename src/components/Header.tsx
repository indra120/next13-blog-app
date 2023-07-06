import Link from 'next/link'
import Logout from './Logout'
import { getSession } from '@lib'
import style from '@styles/header.module.css'

const Header = async () => {
  const session = await getSession()

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
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  )
}

export default Header
