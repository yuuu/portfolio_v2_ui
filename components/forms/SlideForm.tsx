import React from 'react'
import { useForm } from 'react-hook-form'

type Slide = {
  title: string
  body: string
  image: string
  publishedAt: string
  link: string
}

type Props = {
  slide?: Slide
  onSubmit: (slide: Slide) => void
  onError: () => void
}

const SlideForm: React.FC<Props> = ({ slide, onSubmit, onError }) => {
  const { register, handleSubmit, errors } = useForm()

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <label className="block mb-4">
        <span>タイトル</span>
        <input
          type="text"
          name="title"
          className="mt-2 mb-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-100 focus:ring-1"
          ref={register({ required: true })}
          defaultValue={slide?.title}
        />
        <small className="mb-2 text-red-600 block">
          {errors.title && <span>This field is required</span>}
        </small>
      </label>
      <label className="block mb-4">
        <span>序文</span>
        <textarea
          name="body"
          className="mt-2 mb-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-100 focus:ring-1"
          rows={3}
          ref={register({ required: true })}
          defaultValue={slide?.body}
        />
        <small className="mb-2 text-red-600 block">
          {errors.body && <span>This field is required</span>}
        </small>
      </label>
      <label className="block mb-4">
        <span>OGP画像</span>
        <input
          type="text"
          name="image"
          className="mt-2 mb-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-100 focus:ring-1"
          ref={register({ required: true })}
          defaultValue={slide?.image}
        />
        <small className="mb-2 text-red-600 block">
          {errors.image && <span>This field is required</span>}
        </small>
      </label>
      <label className="block mb-4">
        <span>公開日</span>
        <input
          type="date"
          name="publishedAt"
          className="mt-2 mb-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-100 focus:ring-1"
          ref={register({ required: true })}
          defaultValue={slide?.publishedAt}
        />
        <small className="mb-2 text-red-600 block">
          {errors.publishedAt && <span>This field is required</span>}
        </small>
      </label>
      <label className="block mb-4">
        <span>リンクURL</span>
        <input
          type="text"
          name="link"
          className="mt-2 mb-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-100 focus:ring-1"
          ref={register({ required: true })}
          defaultValue={slide?.link}
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

export default SlideForm
