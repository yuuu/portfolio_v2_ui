import React, { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDropzone } from 'react-dropzone'
import axios from '../../lib/axios'

type Skill = {
  id: number
  title: string
  image: string
  key: string
}

type Props = {
  skill?: Skill
  onSubmit: (skill: Skill) => void
  onError: () => void
}

const SkillForm: React.FC<Props> = ({ skill, onSubmit, onError }) => {
  const [imageUrl, setImageUrl] = useState(skill?.image)
  const [imageKey, setImageKey] = useState(skill?.key)
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
        <span>スキル名</span>
        <input
          type="text"
          name="title"
          className="mt-2 mb-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-100 focus:ring-1"
          ref={register({ required: true })}
          defaultValue={skill?.title}
        />
        <small className="mb-2 text-red-600 block">
          {errors.title && <span>This field is required</span>}
        </small>
      </label>
      <label className="block mb-4">
        <span>画像</span>
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
      <input
        type="submit"
        value="Save"
        className="mt-4 px-6 py-2 text-white bg-accent rounded hover:bg-accent-dark"
      />
    </form>
  )
}

export default SkillForm
