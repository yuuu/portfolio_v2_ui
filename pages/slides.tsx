import React from 'react'
import { NextPage } from 'next'
import Layout from '../components/Layout'
import Header from '../components/Haeder'
import { useAuth } from '../lib/next-hook-auth'
import LinkButton from '../components/LinkButton'
import { Slide } from '../lib/client'

export const getStaticProps = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER}/slides`)
  const data = await res.json()

  if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    props: { slides: data, generatedAt: new Date().toLocaleString('ja') },
    revalidate: 10,
  }
}

const Slides: NextPage<{ slides: Slide[]; generatedAt: string }> = ({
  slides,
  generatedAt,
}) => {
  const { currentUser } = useAuth()

  return (
    <Layout signedin={!!currentUser} generatedAt={generatedAt}>
      <Header title="Slides" />
      {currentUser && (
        <div className="flex flex-row justify-end mb-4">
          <LinkButton href="/admin/slides/new">New</LinkButton>
        </div>
      )}
      <div className="container mx-auto">
        <div className="flex flex-wrap">
          {slides?.map((slide) => (
            <div
              className="flex mb-8 md:flex-row w-full flex-col items-center"
              key={slide.id}
            >
              <div className="md:w-1/3 mb-2">
                <a href={slide.link} target="_blank" rel="noreferrer">
                  <img
                    className="object-cover object-center rounded"
                    alt={slide.title}
                    src={slide.image}
                  />
                </a>
              </div>
              <div className="md:flex-grow md:w-1/2 w-full md:pl-16 flex flex-col items-start text-left">
                <h3 className="text-xl text-gray-600 font-bold mb-2">
                  {slide.publishedAt}
                </h3>
                <a href={slide.link} target="_blank" rel="noreferrer">
                  <h2 className="title-font text-3xl mb-4 font-medium text-gray-900 break-all">
                    {slide.title}
                  </h2>
                </a>
                <p className="leading-relaxed break-all">{slide.body}</p>
                {currentUser && (
                  <div className="flex flex-row justify-end mt-4 mb-4">
                    <LinkButton href={`/admin/slides/${slide.id}/edit`}>
                      Edit
                    </LinkButton>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default Slides
