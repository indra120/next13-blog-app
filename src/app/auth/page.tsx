import { AuthSubmit } from '@components'
import style from '@styles/auth.module.css'

interface PageProps {
  searchParams?: {
    mode?: 'login' | 'register'
  }
}

const AuthenticationPage: React.FC<PageProps> = async (props) => {
  const page = props?.searchParams?.mode === 'login' ? 'Login' : 'Register'

  return (
    <form className={style.auth}>
      <h1>{page}</h1>
      {fields.map((f) => (
        <input
          key={f}
          type={f === 'Password' ? 'password' : 'text'}
          name={f.toLowerCase()}
          placeholder={f}
          required
        />
      ))}
      <AuthSubmit />
    </form>
  )
}

const fields = ['Name', 'Password']

export const dynamic = 'force-dynamic'

export default AuthenticationPage
