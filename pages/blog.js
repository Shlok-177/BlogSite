/* eslint-disable prettier/prettier */
import siteMetadata from '@/data/siteMetadata'
import ListLayout from '@/layouts/ListLayout'
import { PageSEO } from '@/components/SEO'

export const POSTS_PER_PAGE = 5

// export async function getStaticProps() {
//   const posts = await getAllFilesFrontMatter('blog')
//   const initialDisplayPosts = posts.slice(0, POSTS_PER_PAGE)
//   const pagination = {
//     currentPage: 1,
//     totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
//   }

//   return { props: { initialDisplayPosts, posts, pagination } }
// }

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`${process.env.BACKEND_URL}/api/blogs`)
  let posts = await res.json()
  posts = posts.data
  // Sort posts by date in descending order (latest date first)
  posts.sort((a, b) => new Date(b.attributes.date) - new Date(a.attributes.date));
  const initialDisplayPosts = posts.slice(0, POSTS_PER_PAGE)
  const pagination = {
    currentPage: 1,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  }
  // Pass data to the page via props
  return { props: { initialDisplayPosts, posts, pagination } }
}

export default function Blog({ posts, initialDisplayPosts, pagination }) {
  return (
    <>
      <PageSEO title={`Blog - ${siteMetadata.author}`} description={siteMetadata.description} />
      <ListLayout
        posts={posts}
        initialDisplayPosts={initialDisplayPosts}
        pagination={pagination}
        title="All Posts"
      />
    </>
  )
}
