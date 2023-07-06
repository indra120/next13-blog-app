import { AuthSubmit } from '@components'
import style from '@styles/auth.module.css'

const RegisterPage = () => (
  <form className={style.auth}>
    <h1>Register</h1>
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

export default RegisterPage
