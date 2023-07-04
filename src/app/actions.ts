'use server'

import fs from 'fs/promises'
import { hash } from 'bcrypt'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { db } from '@lib'
import { authOptions } from '@lib'
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
  const file = <File>data.get('cover')
  const [cover, session] = await Promise.all([
    file.arrayBuffer(),
    getServerSession(authOptions),
  ])
  const imageUrl = `./public/images/${Date.now()}.${file.type.split('/')[1]}`

  await Promise.all([
    db.post.create({
      data: {
        title: <string>data.get('title'),
        content: <string>data.get('content'),
        cover: imageUrl.slice(16),
        summary: <string>data.get('summary'),
        authorName: session?.user?.name!,
      },
    }),
    fs.appendFile(imageUrl, Buffer.from(cover)),
  ])

  redirect('/')
}

export const updatePost: Actions = async (data) => {
  const file = <File>data.get('cover')
  const id = <string>data.get('id')
  const postData: any = {
    title: <string>data.get('title'),
    content: <string>data.get('content'),
    summary: <string>data.get('summary'),
  }

  if (file.type.includes('image')) {
    const imageUrl = `./public/images/${Date.now()}.${file.type.split('/')[1]}`
    await fs.appendFile(imageUrl, Buffer.from(await file.arrayBuffer()))
    fs.unlink(
      `./public/images/${
        (await db.post.findUnique({ where: { id }, select: { cover: true } }))
          ?.cover
      }`
    )
    postData.cover = imageUrl.slice(16)
  }

  await db.post.update({
    where: { id },
    data: postData,
  })

  revalidatePath(`/post/${id}`)
  redirect(`/post/${id}`)
}
