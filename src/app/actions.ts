'use server'

import { hash }from 'bcrypt'
import { db } from '@lib'
import type { Actions } from '@types'

export const register: Actions = async (data) => {
  try {
    const existingUser = await db.user.findUnique({
      where: { name: <string>data.get('name') },
    })
    if (existingUser) throw Error('User already exists')

    data.set('password', await hash(<string>data.get('password'), 10))

    await db.user.create({
      data: {
        name: <string>data.get('name'),
        password: <string>data.get('password'),
      },
    })

    return { success: true }
  } catch (error) {
    // @ts-ignore
    throw Error(`Error registering user: ${error.message}`)
  }
}
