import React from 'react'
import Layout from '../components/Layout'
import Header from '../components/Haeder'
import { useAuth } from '../lib/next-hook-auth'
import LinkButton from '../components/LinkButton'

const Apps: React.FC = () => {
  const { currentUser } = useAuth()

  const apps = [
    {
      category: 'Web System',
      title: "yuuu's portfolio",
      description: 'このページです。Next.js + Ruby on Railsで構築しています。',
      link: '/',
      image: '/images/apps/portfolio_v2.png',
    },
    {
      category: 'Web System',
      title: "yuuu's portfolio (old)",
      description: '旧ポートフォリオです。Nuxt.jsで作成しました。',
      link: 'https://portfolio.y-uuu.net/',
      image: '/images/apps/portfolio.png',
    },
    {
      category: 'Web System',
      title: 'C2Diary',
      description: '自分専用の日記システムです。',
      link: 'https://c2diary.herokuapp.com/',
      image: '/images/apps/c2diary.png',
    },
    {
      category: 'Slack Bot',
      title: 'Tigers Eye',
      description: '阪神タイガースの試合状況をSlackへ通知するアプリです。',
      link: 'https://github.com/yuuu/tigers-eye',
      image: '/images/apps/tigers-eye.png',
    },
    {
      category: 'Plugin',
      title: 'Redmine Nikoca Re Plugin',
      description: 'Redmineにニコカレ機能を追加するためのプラグインです。',
      link: 'https://github.com/yuuu/redmine_nikoca_re',
      image: '/images/apps/nikokare.png',
    },
    {
      category: 'Desktop App',
      title: 'Minamoni',
      description: 'ETロボコン用に製作したモニタリング用のツールです。',
      link: 'https://github.com/yuuu/Minamoni',
      image: '/images/apps/minamoni.png',
    },
  ]

  return (
    <Layout signedin={!!currentUser}>
      <Header title="Apps" />
      {currentUser && (
        <div className="flex flex-row justify-end mb-4">
          <LinkButton href="/admin/apps">Edit</LinkButton>
        </div>
      )}
      <div className="container mx-auto">
        <div className="flex flex-wrap">
          {apps.map((app) => (
            <div key={app.title} className="p-4 md:w-1/3">
              <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                <img
                  className="lg:h-48 md:h-36 w-full object-cover object-center"
                  src={app.image}
                  alt={app.title}
                />
                <div className="p-6">
                  <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                    {app.category}
                  </h2>
                  <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                    {app.title}
                  </h1>
                  <p className="leading-relaxed mb-3">{app.description}</p>
                  <div className="flex items-center flex-wrap ">
                    <a
                      className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0"
                      href={app.link}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Learn More
                      <svg
                        className="w-4 h-4 ml-2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14"></path>
                        <path d="M12 5l7 7-7 7"></path>
                      </svg>
                    </a>
                  </div>
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
