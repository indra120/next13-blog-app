'use server'

import fs from 'fs/promises'
import { hash } from 'bcrypt'
import { db } from '@lib'
import type { Actions } from '@types'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

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
  const file = <File>data.get('cover')
  const cover = await file.arrayBuffer()
  const imageUrl = `./public/images/${Date.now()}.${file.type.split('/')[1]}`
  const session = await getServerSession()

  await db.post.create({
    data: {
      title: <string>data.get('title'),
      content: <string>data.get('content'),
      cover: imageUrl.slice(8),
      summary: <string>data.get('summary'),
      authorName: session?.user?.name!,
    },
  })
  await fs.appendFile(imageUrl, Buffer.from(cover))

  redirect('/')
}
