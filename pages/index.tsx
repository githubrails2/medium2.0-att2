import { Header, Posts, SubHeader } from '../components'

import Head from 'next/head'
import { Post } from '../utils/typings.js'
import { sanityClient } from '../utils/sanity.js'

export interface Props {
  posts: Post[]
}
const Home = ({ posts }: Props) => {
  return (
    <div>
      <Head>
        <title>Medium 2.0</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <SubHeader />
      <Posts posts={posts} />
    </div>
  )
}
export default Home
export const getServerSideProps = async () => {
  const query = `*[_type == "post" ] {
    _id,
    title,
    author -> {
      name,
      image
    },
    description,
    mainImage,
    slug
  }`
  const posts = await sanityClient.fetch(query)
  return {
    props: {
      posts,
    },
  }
}
