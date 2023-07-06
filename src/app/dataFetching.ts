import { cache } from 'react'
import { db } from '@lib'

export const getPosts = cache(
  async () => await db.post.findMany({
    orderBy: { createdAt: 'desc' },
    take: 10,
  })
)

export const getPost = cache(
  async (id: string) => await db.post.findUnique({
    where: { id },
  })
)
