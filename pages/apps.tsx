import React from 'react'
import { NextPage } from 'next'
import Layout from '../components/Layout'
import Header from '../components/Haeder'
import { useAuth } from '../lib/next-hook-auth'
import LinkButton from '../components/LinkButton'
import { App } from '../lib/client'

export const getStaticProps = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER}/apps`)
  const data = await res.json()

  if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    props: { apps: data, generatedAt: new Date().toLocaleString('ja') },
    revalidate: 10,
  }
}

const Apps: NextPage<{ apps: App[]; generatedAt: string }> = ({
  apps,
  generatedAt,
}) => {
  const { currentUser } = useAuth()

  return (
    <Layout signedin={!!currentUser} loading={!apps} generatedAt={generatedAt}>
      <Header title="Apps" />
      {currentUser && (
        <div className="flex flex-row justify-end mb-8">
          <LinkButton href="/admin/apps/new">New</LinkButton>
        </div>
      )}
      <div className="container mx-auto">
        <div className="flex flex-wrap">
          {apps?.map((app) => (
            <div key={app.id} className="p-4 md:w-1/3">
              <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                <a href={app.link} target="_blank" rel="noreferrer">
                  <img
                    className="lg:h-48 md:h-36 w-full object-cover object-center"
                    src={app.image}
                    alt={app.title}
                  />
                </a>
                <div className="p-6">
                  <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                    {app.category}
                  </h2>
                  <a href={app.link} target="_blank" rel="noreferrer">
                    <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                      {app.title}
                    </h1>
                  </a>
                  <p className="leading-relaxed mb-3">{app.description}</p>
                  {currentUser && (
                    <div className="flex flex-row justify-end mt-4 mb-4">
                      <LinkButton href={`/admin/apps/${app.id}/edit`}>
                        Edit
                      </LinkButton>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default Apps
