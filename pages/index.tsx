import { sanityClient, urlFor } from '../utils/sanity.js'

import Head from 'next/head'
import Header from '../components/Header'
import Link from 'next/link'
import { Post } from '../utils/typings.js'
import SubHeader from '../components/SubHeader'

interface Props {
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

      <div className=" grid grid-cols-1 gap-3 p-2 sm:grid-cols-2  md:gap-6 md:p-6  lg:grid-cols-3">
        {posts.map((post) => (
          <div
            key={post._id}
            className="mx-auto flex max-w-7xl  justify-between"
          >
            <Link href={`/post/${post.slug.current}`}>
              <div className="group cursor-pointer overflow-hidden rounded-lg border ">
                <img
                  className="h-60 w-full transform object-cover transition duration-200 ease-in-out group-hover:scale-105"
                  src={urlFor(post.mainImage).url()!}
                  alt=""
                />
                <div className="flex justify-between bg-white p-5">
                  <div>
                    <p className="text-lg font-bold">{post.title}</p>
                    <p className="text-sm">
                      {post.description} by {post.author.name}
                    </p>
                  </div>

                  <img
                    className="h-12 w-12 rounded-full"
                    src={urlFor(post.author.image).url()!}
                    alt=""
                  />
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
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
