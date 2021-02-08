import React from 'react'
import Layout from '../components/Layout'
import Header from '../components/Haeder'
import { useAuth } from '../lib/next-hook-auth'
import LinkButton from '../components/LinkButton'

const Articles: React.FC = () => {
  const { currentUser, signout } = useAuth(
    '/administrators/me',
    '/administrators/sign_in',
    '/administrators/sign_out',
    '/'
  )

  return (
    <Layout user={currentUser} signout={signout}>
      <Header title="Articles" />
      {currentUser && (
        <div className="flex flex-row justify-end mb-4">
          <LinkButton href="/admin/articles">Edit</LinkButton>
        </div>
      )}
      <div className="container mx-auto">
        <div className="flex flex-wrap">
          <div className="flex mb-8 md:flex-row flex-col items-center">
            <div className="md:w-1/3 mb-2">
              <a
                href="https://qiita.com/Y_uuu/items/1651b181f06499c5cede"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  className="object-cover object-center rounded"
                  alt="hero"
                  src="https://qiita-user-contents.imgix.net/https%3A%2F%2Fcdn.qiita.com%2Fassets%2Fpublic%2Farticle-ogp-background-1150d8b18a7c15795b701a55ae908f94.png?ixlib=rb-1.2.2&w=1200&mark=https%3A%2F%2Fqiita-user-contents.imgix.net%2F~text%3Fixlib%3Drb-1.2.2%26w%3D840%26h%3D380%26txt%3DRails%25206.1%25E5%25AF%25BE%25E5%25BF%259C%25E7%2589%2588%253A%2520API%25E3%2583%25A2%25E3%2583%25BC%25E3%2583%2589%25E3%2581%25AERails%25E3%2581%25AB%25E5%25AF%25BE%25E3%2581%2597%25E3%2581%25A6CrossOrigin%25E3%2581%25AASPA%25E3%2581%258B%25E3%2582%2589Session%25E8%25AA%258D%25E8%25A8%25BC%25E3%2581%2599%25E3%2582%258B%25E6%2596%25B9%25E6%25B3%2595%26txt-color%3D%2523333%26txt-font%3DHiragino%2520Sans%2520W6%26txt-size%3D54%26txt-clip%3Dellipsis%26txt-align%3Dcenter%252Cmiddle%26s%3Dc4830fc0ffd888b046a765b0e92859ab&mark-align=center%2Cmiddle&blend=https%3A%2F%2Fqiita-user-contents.imgix.net%2F~text%3Fixlib%3Drb-1.2.2%26w%3D840%26h%3D500%26txt%3D%2540Y_uuu%26txt-color%3D%2523333%26txt-font%3DHiragino%2520Sans%2520W6%26txt-size%3D45%26txt-align%3Dright%252Cbottom%26s%3D50d8ecbc8eea8379fc3dfb3eb22e0820&blend-align=center%2Cmiddle&blend-mode=normal&s=8954e10eb896b916d97728dfdf5b7e0a"
                />
              </a>
            </div>
            <div className="md:flex-grow md:w-1/2 w-full md:pl-16 flex flex-col items-start text-left">
              <h3 className="text-xl text-gray-600 font-bold mb-2">
                2021-02-09
              </h3>
              <a
                href="https://qiita.com/Y_uuu/items/1651b181f06499c5cede"
                target="_blank"
                rel="noreferrer"
              >
                <h1 className="title-font text-3xl mb-4 font-medium text-gray-900">
                  Rails 6.1対応版:
                  APIモードのRailsに対してCrossOriginなSPAからSession認証する方法
                </h1>
              </a>
              <p className="leading-relaxed">
                本記事では、APIモードのRailsに対してCrossOriginなSPAからSession(Cookie)認証する方法を解説します。
                モダンなフロントエンド開発だと、Auth0やFirebaseを使った認証例が多く見られますが、バックエンドにRailsを使った認証例はまだまだ少ないと感じています。
                JWT認証ではなくCookie認証となると、その数はさらに少ないようです。
              </p>
            </div>
          </div>
          <div className="flex mb-8 md:flex-row flex-col items-center">
            <div className="md:w-1/3 mb-2">
              <a
                href="https://zenn.dev/y_uuu/articles/95d7071992d662"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  className="object-cover object-center rounded"
                  alt="hero"
                  src="https://res.cloudinary.com/dlhzyuewr/image/upload/s--jALEq-Ok--/co_rgb:222%2Cg_south_west%2Cl_text:notosansjp-medium.otf_37_bold:Y_uuu%2Cx_203%2Cy_98/c_fit%2Cco_rgb:222%2Cg_north_west%2Cl_text:notosansjp-medium.otf_70_bold:AWS%2520Amplify%25E3%2582%2592%25E4%25BD%25BF%25E3%2581%25A3%25E3%2581%259F%25E9%2596%258B%25E7%2599%25BA%25E3%2581%25A7%25E5%25BD%25B9%25E7%25AB%258B%25E3%2581%25A4%25E9%2580%2586%25E5%25BC%2595%25E3%2581%258DTips%25E9%259B%2586%25282020%25E5%25B9%25B4%25E7%2589%2588%2529%2Cw_1010%2Cx_90%2Cy_100/g_south_west%2Ch_90%2Cl_fetch:aHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EtL0FPaDE0R2dVMGM0YkQ1cEJFbW5SNDFkY0wyeVI2UnBOOG1BUHVPbnlDR3M9czgwLWM=%2Cr_max%2Cw_90%2Cx_87%2Cy_72/v1609308637/og/new_txlqub.png"
                />
              </a>
            </div>
            <div className="md:flex-grow md:w-1/2 w-full md:pl-16 flex flex-col items-start text-left">
              <h3 className="text-xl text-gray-600 font-bold mb-2">
                2021-02-09
              </h3>
              <a
                href="https://zenn.dev/y_uuu/articles/95d7071992d662"
                target="_blank"
                rel="noreferrer"
              >
                <h1 className="title-font text-3xl mb-4 font-medium text-gray-900">
                  AWS Amplifyを使った開発で役立つ逆引きTips集(2020年版)
                </h1>
              </a>
              <p className="leading-relaxed">
                本記事は AWS Amplify Advent Calendar 2020 の2日目の記事です。
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Articles
