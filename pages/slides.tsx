import React from 'react'
import Layout from '../components/Layout'
import Header from '../components/Haeder'
import { useAuth } from '../lib/next-hook-auth'
import LinkButton from '../components/LinkButton'

const Slides: React.FC = () => {
  const { currentUser } = useAuth()

  return (
    <Layout signedin={!!currentUser}>
      <Header title="Slides" />
      {currentUser && (
        <div className="flex flex-row justify-end mb-4">
          <LinkButton href="/admin/slides">Edit</LinkButton>
        </div>
      )}
      <div className="container mx-auto">
        <div className="flex flex-wrap">
          <div className="flex mb-8 md:flex-row w-full flex-col items-center">
            <div className="md:w-1/3 mb-2">
              <a
                href="https://speakerdeck.com/yuuu/xian-dai-ban-pokeberuwozhi-eruji-shu-soracom-ug-explorer-2020-lt"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  className="object-cover object-center rounded"
                  alt="hero"
                  src="https://files.speakerdeck.com/presentations/eae7b1eed72e4fad858711c94ede501a/slide_0.jpg?16953210"
                />
              </a>
            </div>
            <div className="md:flex-grow md:w-1/2 w-full md:pl-16 flex flex-col items-start text-left">
              <h3 className="text-xl text-gray-600 font-bold mb-2">
                2021-02-09
              </h3>
              <a
                href="https://speakerdeck.com/yuuu/xian-dai-ban-pokeberuwozhi-eruji-shu-soracom-ug-explorer-2020-lt"
                target="_blank"
                rel="noreferrer"
              >
                <h1 className="title-font text-3xl mb-4 font-medium text-gray-900">
                  現代版・ポケベルを支える技術 - SORACOM UG Explorer 2020 LT
                </h1>
              </a>
              <p className="leading-relaxed">
                SORACOM UG Explorer 2020 ライトニングトーク 2020年12月19日(土)
                16:50〜 現代版・ポケベルを支える技術
                ポケベル製作を通じて得られた技術的知見をまとめたLTです。
                https://qiita.com/Y_uuu/items/9c781f269167d73ee262
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Slides
