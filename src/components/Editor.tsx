'use client'

import { useRef } from 'react'
import ReactQuill from 'react-quill'
import { createNewPost } from '@app/actions'
import 'react-quill/dist/quill.snow.css'

const Editor = () => {
  const content = useRef<ReactQuill>(null)

  return (
    <>
      <ReactQuill ref={content} theme="snow" modules={modules} />
      <button
        type="submit"
        style={{ marginTop: '5px' }}
        formAction={async (data) => {
          data.append('content', content.current?.value as string)
          await createNewPost(data)
        }}
      >
        Create post
      </button>
    </>
  )
}

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['link', 'image'],
    ['clean'],
  ],
}

export default Editor
