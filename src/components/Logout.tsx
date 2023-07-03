'use client'
import { signOut } from 'next-auth/react'

interface Props {
  username: string
}

const Logout: React.FC<Props> = (props) => (
  <span onClick={() => signOut()}>Logout {props.username}</span>
)

export default Logout
