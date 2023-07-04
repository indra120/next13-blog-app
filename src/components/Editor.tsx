'use client'

import { useMemo, useRef } from 'react'
import { experimental_useFormStatus as useFormStatus } from 'react-dom'
import { useParams } from 'next/navigation'
import ReactQuill from 'react-quill'
import { createNewPost, updatePost } from '@app/actions'
import 'react-quill/dist/quill.snow.css'

interface Props {
  mode: 'create' | 'edit'
  defaultValues?: string
}

const Editor: React.FC<Props> = (props) => {
  const content = useRef<ReactQuill>(null)
  const createMode = useMemo(() => props.mode === 'create', [props.mode])
  const params = useParams()
  const { pending } = useFormStatus()

  return (
    <>
      <ReactQuill
        ref={content}
        defaultValue={!createMode ? props.defaultValues : ''}
        theme="snow"
        modules={modules}
      />

      <button
        type="submit"
        style={{ marginTop: '5px' }}
        disabled={pending}
        formAction={async (data) => {
          data.append('content', content.current?.value as string)
          if (createMode) {
            await createNewPost(data)
          } else {
            data.append('id', params.id as string)
            await updatePost(data)
          }
        }}
      >
        {createMode ? 'Create' : 'Update'} post
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
