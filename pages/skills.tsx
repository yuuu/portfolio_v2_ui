import React from 'react'
import Layout from '../components/Layout'
import Header from '../components/Haeder'
import { useAuth } from '../lib/next-hook-auth'
import LinkButton from '../components/LinkButton'

const Skills: React.FC = () => {
  const { currentUser } = useAuth()

  const skills = [
    { name: 'Ruby', image: 'ruby.png' },
    { name: 'Ruby on Rails', image: 'rails.png' },
    { name: 'Golang', image: 'golang.png' },
    { name: 'C', image: 'c.png' },
    { name: 'JavaScript', image: 'javascript.png' },
    { name: 'React', image: 'react.png' },
    { name: 'Next.js', image: 'nextjs.svg' },
    {
      name: 'AWS Certified Solutions Architect – Associate',
      image: 'AWS-SolArchitect-Associate-2020.png',
    },
    {
      name: 'AWS Certified Solutions Architect – Professional',
      image: 'AWS-SolArchitect-Professional-2020.png',
    },
    {
      name: 'AWS Certified DevOps Engineer – Professional',
      image: 'AWS-DevOpsEngineer-Professional-2020.png',
    },
    {
      name: 'AWS Certified Advanced Networking – Specialty',
      image: 'AWS-AdvNetworking-Specialty-2020.png',
    },
    {
      name: 'SORACOM IoT Engineer basic for sps',
      image: 'logo_Accredited_ie_rgb_2.png',
    },
  ]

  return (
    <Layout signedin={!!currentUser}>
      <Header title="Skills" />
      {currentUser && (
        <div className="flex flex-row justify-end mb-4">
          <LinkButton href="/admin/skills">Edit</LinkButton>
        </div>
      )}
      <div className="container mx-auto">
        <dl className="mt-4 flex flex-wrap items-center space-x-4 space-y-4 grid md:grid-cols-4 grid-cols-2">
          {skills.map((skill) => (
            <div className="w-36 rounded-md bg-indigo-500" key={skill.name}>
              <img className="" src={`/images/skills/${skill.image}`} />
            </div>
          ))}
        </dl>
      </div>
    </Layout>
  )
}

export default Skills
