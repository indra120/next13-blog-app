import { Editor } from '@components'

const CreatePostPage = () => (
  <form>
    <input type="text" name="title" placeholder="Title" required />
    <input type="text" name="summary" placeholder="Summary" required />
    <input type="file" name="cover" required />
    <Editor mode="create" />
  </form>
)

export default CreatePostPage
