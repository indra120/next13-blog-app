'use client'

import { useMemo, useRef } from 'react'
import { experimental_useFormStatus as useFormStatus } from 'react-dom'
import { useParams, useRouter } from 'next/navigation'
import ReactQuill from 'react-quill'
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage'
import { storage } from '@firebase/config'
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
  const router = useRouter()

  return (
    <>
      <ReactQuill
        ref={content}
        defaultValue={!createMode ? props.defaultValues : ''}
        theme="snow"
        modules={modules}
        style={{ height: '300px' }}
      />

      <button
        type="submit"
        style={{ marginTop: '45px' }}
        disabled={pending}
        formAction={async (data) => {
          data.append('content', content.current?.value as string)

          if (data.get('cover') === null) {
            data.delete('cover')
            data.append('id', params.id as string)

            await updatePost(data)
            router.push(`/post/${params.id}`)
          } else {
            const file = data.get('cover') as File
            const storageRef = ref(
              storage,
              `images/${Date.now()}.${file.type.split('/')[1]}`
            )
            const uploadTask = uploadBytesResumable(storageRef, file)

            uploadTask.on(
              'state_changed',
              () => {},
              console.error,
              async () => {
                data.set('cover', await getDownloadURL(uploadTask.snapshot.ref))

                if (createMode) {
                  await createNewPost(data)
                  router.push('/')
                } else {
                  data.append('id', params.id as string)
                  await updatePost(data)
                  router.push(`/post/${params.id}`)
                }
              }
            )
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
