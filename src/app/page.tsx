import { formatISO9075 } from 'date-fns'
import Link from 'next/link'
import { getPosts } from './dataFetching'
import style from '@styles/home.module.css'

const HomePage = async () => {
  const posts = await getPosts()

  return (
    <>
      {posts?.map((post) => (
        <div key={post.id} className={style.post}>
          <div className={style.image}>
            <Link href={`/post/${post.id}`}>
              <img src={post.cover} alt="" />
            </Link>
          </div>

          <div className={style.texts}>
            <Link href={`/post/${post.id}`}>
              <h2>{post.title}</h2>
            </Link>

            <p className={style.info}>
              <a className={style.author}>{post.authorName}</a>
              <time>{formatISO9075(new Date(post.createdAt))}</time>
            </p>

            <p className={style.author}>{post.summary}</p>
          </div>
        </div>
      ))}
    </>
  )
}

export default HomePage
