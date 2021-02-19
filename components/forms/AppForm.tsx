import React, { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDropzone } from 'react-dropzone'
import axios from '../../lib/axios'

type App = {
  id: number
  title: string
  category: string
  description: string
  image: string
  link: string
  key: string
}

type Props = {
  app?: App
  onSubmit: (app: App) => void
  onError: () => void
}

const AppForm: React.FC<Props> = ({ app, onSubmit, onError }) => {
  const [imageUrl, setImageUrl] = useState(app?.image)
  const [imageKey, setImageKey] = useState(app?.key)
  const { register, handleSubmit, errors } = useForm()
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach(async (file) => {
      const {
        data: { signedUrl, key },
      } = await axios.post('/images')
      await axios.put(signedUrl, file, {
        headers: {
          'Access-Control-Allow-Origin': location.href,
          'Content-Type': file.type,
        },
      })
      const res = await axios.get(`/images/${key}`)
      setImageUrl(res.data.signedUrl)
      setImageKey(key)
    })
  }, [])
  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <label className="block mb-4">
        <label className="block mb-4">
          <span>アプリ名</span>
          <input
            type="text"
            name="title"
            className="mt-2 mb-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-100 focus:ring-1"
            ref={register({ required: true })}
            defaultValue={app?.title}
          />
          <small className="mb-2 text-red-600 block">
            {errors.title && <span>This field is required</span>}
          </small>
        </label>
        <span>カテゴリ</span>
        <input
          type="text"
          name="category"
          className="mt-2 mb-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-100 focus:ring-1"
          ref={register({ required: true })}
          defaultValue={app?.category}
        />
        <small className="mb-2 text-red-600 block">
          {errors.category && <span>This field is required</span>}
        </small>
      </label>
      <label className="block mb-4">
        <span>紹介文</span>
        <textarea
          name="description"
          className="mt-2 mb-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-100 focus:ring-1"
          rows={3}
          ref={register({ required: true })}
          defaultValue={app?.description}
        />
        <small className="mb-2 text-red-600 block">
          {errors.description && <span>This field is required</span>}
        </small>
      </label>
      <label className="block mb-4">
        <span>スクリーンショット</span>
        {imageKey && <img src={imageUrl} className="h-32 m-4" />}
        <div
          className="border-dashed border-2 h-32 rounded flex justify-center items-center"
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          <p className="block text-gray-400">Drop the files here ...</p>
        </div>
        <input
          type="hidden"
          name="key"
          ref={register({ required: true })}
          defaultValue={imageKey}
        />
        <small className="mb-2 text-red-600 block">
          {errors.key && <span>This field is required</span>}
        </small>
      </label>
      <label className="block mb-4">
        <span>リンクURL</span>
        <input
          type="text"
          name="link"
          className="mt-2 mb-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-100 focus:ring-1"
          ref={register({ required: true })}
          defaultValue={app?.link}
        />
        <small className="mb-2 text-red-600 block">
          {errors.link && <span>This field is required</span>}
        </small>
      </label>
      <input
        type="submit"
        value="Save"
        className="mt-4 px-6 py-2 text-white bg-accent rounded hover:bg-accent-dark"
      />
    </form>
  )
}

export default AppForm
