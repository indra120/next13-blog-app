import { getServerSession } from 'next-auth'
import authOptions from './authOptions'

const getSession = async () => await getServerSession(authOptions)

export default getSession
