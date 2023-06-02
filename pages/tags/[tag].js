/* eslint-disable prettier/prettier */
import { TagSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import ListLayout from '@/layouts/ListLayout'
import formatDate from '@/lib/utils/formatDate'
import kebabCase from '@/lib/utils/kebabCase'
import Link from 'next/link'

export async function getServerSideProps(context) {
  let text = context.params.tag

  // Fetch data from external API
  const res = await fetch(`${process.env.BACKEND_URL}/api/blogs`)
  let posts = await res.json()
  posts = posts.data

  const finalPosts = posts.filter((obj) => obj.attributes.tags.toLowerCase().includes(text))
  return { props: { finalPosts, text } }
}

export default function Tag({ finalPosts, text }) {
  return (
    <>
      <div className="mx-auto max-w-6xl divide-y divide-gray-400">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            {text}
          </h1>
        </div>
        <ul>
          {/* {!filteredBlogPosts.length && 'No posts found.'} */}
          {finalPosts.map((val) => {
            return (
              <Link
                href={`/blog/${val.attributes.slug}`}
                key={val.attributes.slug}
                className="group flex bg-transparent bg-opacity-20 px-2 transition duration-100 hover:scale-105 hover:rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <li key={val.attributes.slug} className="py-6">
                  <article className="space-y-2 bg-transparent bg-opacity-20 p-2 transition duration-200 hover:rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-3">
                    <dl>
                      <dd className="text-sm font-normal leading-6 text-gray-500 dark:text-gray-400">
                        <time dateTime={val.attributes.date}>
                          {formatDate(val.attributes.date)}
                        </time>
                        {' • '}
                        <span>{val.attributes.author}</span>
                      </dd>
                    </dl>
                    <div className="space-y-5 xl:col-span-4">
                      <div className="space-y-1">
                        <div>
                          <h2 className="text-2xl font-bold leading-8 tracking-tight">
                            <Link
                              href={`/blog/${val.attributes.slug}`}
                              className="text-gray-900 transition duration-500 ease-in-out hover:text-primary-500 dark:text-gray-100 dark:hover:text-primary-500"
                            >
                              {val.attributes.title}
                            </Link>
                          </h2>
                        </div>
                        <div className="flex flex-wrap">
                          {/* {tags.map((tag) => (
                            <Tag key={tag} text={tag} />
                          ))} */}
                        </div>
                        <div className="prose max-w-none pt-5 text-gray-500 dark:text-gray-400">
                          {val.attributes.content.slice(1, 150)}
                        </div>
                      </div>
                    </div>
                  </article>
                </li>
              </Link>
            )
          })}
        </ul>
      </div>
    </>
  )
}
