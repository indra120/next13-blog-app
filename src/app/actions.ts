'use server'

import fs from 'fs/promises'
import { hash } from 'bcrypt'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { db, getSession } from '@lib'
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

export const createNewPost: Actions = async (data) => {
  const session = await getSession()
  data.set('authorName', <string>session?.user?.name)

  await db.post.create({ data: <any>Object.fromEntries(data) })

  revalidatePath('/')
}

export const updatePost: Actions = async (data) => {
  const id = <string>data.get('id')
  data.delete('id')

  await db.post.update({
    where: { id },
    data: <any>Object.fromEntries(data),
  })

  revalidatePath(`/post/${id}`)
}
