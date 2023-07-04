import { formatISO9075 } from 'date-fns'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import { getPost } from '@app/dataFetching'
import { authOptions } from '@lib'
import style from '@styles/post.module.css'

export interface PageProps {
  params: {
    id: string
  }
}

const PostDetailPage: React.FC<PageProps> = async (props) => {
  const [post, session] = await Promise.all([
    getPost(props.params.id),
    getServerSession(authOptions),
  ])

  return (
    <div className={style.postDetail}>
      <h1 className={style.title}>{post?.title}</h1>

      <time className={style.time}>
        {formatISO9075(new Date(post?.createdAt!))}
      </time>

      <div className={style.author}>by @{post?.authorName}</div>

      {session?.user?.name === post?.authorName && (
        <div className={style.edit}>
          <Link className={style.editBtn} href={`/post/${post?.id}/edit`}>
            <EditIcon />
            Edit this post
          </Link>
        </div>
      )}

      <div className={style.image}>
        <img src={`/images/${post?.cover}`} alt="" />
      </div>

      <div
        className={style.content}
        dangerouslySetInnerHTML={{ __html: post?.content! }}
      />
    </div>
  )
}

const EditIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
    />
  </svg>
)

export default PostDetailPage
