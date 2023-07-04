import { Editor } from "@components"

const CreatePostPage = () => {
  return (
    <form>
      <input type="text" name="title" placeholder="Title" required />
      <input type="text" name="summary" placeholder="Summary" required />
      <input type="file" name="cover" required />
      <Editor mode="create" />
    </form>
  )
}

export default CreatePostPage
