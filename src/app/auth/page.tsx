import style from '@styles/auth.module.css'

interface PageProps {
  searchParams?: {
    mode?: 'login' | 'register'
  }
}

const AuthenticationPage: React.FC<PageProps> = (props) => {
  const page = props?.searchParams?.mode === 'login' ? 'Login' : 'Register'

  return (
    <form className={style.auth}>
      <h1>{page}</h1>
      <input type="text" name="username" placeholder="Username" />
      <input type="password" name="password" placeholder="Password" />
      <button>{page}</button>
    </form>
  )
}

export const dynamic = 'force-dynamic'

export default AuthenticationPage
