import React from 'react'
import { NextPage } from 'next'
import Link from 'next/link'
import Layout from '../components/Layout'
import Header from '../components/Haeder'
import { useAuth } from '../lib/next-hook-auth'
import LinkButton from '../components/LinkButton'
import { Skill } from '../lib/client'
import { Tooltip } from 'react-tippy'

export const getStaticProps = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER}/skills`)
  const data = await res.json()

  if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    props: { skills: data, generatedAt: new Date().toLocaleString('ja') },
    revalidate: 10,
  }
}

const Skills: NextPage<{ skills: Skill[]; generatedAt: string }> = ({
  skills,
  generatedAt,
}) => {
  const { currentUser } = useAuth()

  return (
    <Layout
      signedin={!!currentUser}
      loading={!skills}
      generatedAt={generatedAt}
    >
      <Header title="Skills" />
      {currentUser && (
        <div className="flex flex-row justify-end mb-4">
          <LinkButton href="/admin/skills/new">New</LinkButton>
        </div>
      )}
      <div className="container mx-auto">
        <dl className="mt-4 flex flex-wrap justify-items-center items-center space-x-4 grid md:grid-cols-4 grid-cols-2">
          {skills.map((skill) => (
            <div key={skill.id}>
              <div className="w-36 mb-32 rounded-md bg-indigo-500">
                <Tooltip
                  title={skill.title}
                  position="top"
                  trigger="mouseenter"
                >
                  {currentUser ? (
                    <Link href={`/admin/skills/${skill.id}/edit`}>
                      <a>
                        <img className="" src={skill.image} />
                      </a>
                    </Link>
                  ) : (
                    <img className="" src={skill.image} />
                  )}
                </Tooltip>
              </div>
            </div>
          ))}
        </dl>
      </div>
    </Layout>
  )
}

export default Skills
