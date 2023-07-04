import { cache } from 'react'
import { db } from '@lib'

export const getPosts = cache(async () => {
  return await db.post.findMany({
    orderBy: { createdAt: 'desc' },
    take: 10,
  })
})

export const getPost = cache(async (id: string) => {
  return await db.post.findUnique({
    where: { id },
  })
})
