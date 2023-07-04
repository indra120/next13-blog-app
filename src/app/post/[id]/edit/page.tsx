import { getPost } from '@app/dataFetching'
import { Editor } from '@components'
import { PageProps } from '../page'

const EditPostPage: React.FC<PageProps> = async (props) => {
  const post = await getPost(props.params.id)

  return (
    <form>
      <input type="text" name="title" placeholder="Title" defaultValue={post?.title} required />
      <input type="text" name="summary" placeholder="Summary" defaultValue={post?.summary} required />
      <input type="file" name="cover" />
      <Editor mode="edit" defaultValues={post?.content} />
    </form>
  )
}

export default EditPostPage
