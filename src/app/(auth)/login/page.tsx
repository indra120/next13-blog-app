import { AuthSubmit } from '@components'
import style from '@styles/auth.module.css'

const LoginPage = () => (
  <form className={style.auth}>
    <h1>Login</h1>
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

const fields = ['Name', 'Password']

export default LoginPage
