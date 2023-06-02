/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */

import PageTitle from '@/components/PageTitle'
import SectionContainer from '@/components/SectionContainer'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'
import { HiOutlineClock, HiOutlineEye, HiOutlinePencil } from 'react-icons/hi'
import Image from 'next/image'
import Link from 'next/link'
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  RedditShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from 'react-share'
import { SocialIcon } from 'react-social-icons'
import Head from 'next/head'
import siteMetadata from '@/data/siteMetadata'
import { BsCalendarDate } from 'react-icons/bs'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'

const DEFAULT_LAYOUT = 'PostLayout'

export async function getServerSideProps(context) {
  let { slug } = context.query
  const { req } = context
  const protocol = req.headers['x-forwarded-proto'] || 'http'
  const host = req.headers['x-forwarded-host'] || req.headers['host']
  const path = req.url.split('?')[0].split('/development')[1].split('.json')[0]
  // console.log(path);
  const postUrl = `${protocol}://${host}${path}`
  console.log(postUrl)

  try {
    const res = await fetch(
      `${process.env.BACKEND_URL}/api/blogs?filters[slug]=${slug[0]}&populate=*`
    )
    // change id to date and display blog accrodingly that
    const nextres = await fetch(`${process.env.BACKEND_URL}/api/blogs/?filters[id]=${3}&populate=*`)
    const prevres = await fetch(`${process.env.BACKEND_URL}/api/blogs/?filters[id]=${2}&populate=*`)

    let post = await res.json()
    let next = await nextres.json()
    let prev = await prevres.json()
    post = post.data[0]
    next = next.data[0]

    prev = prev.data[0]

    return { props: { postUrl, post, next, prev } }
  } catch (error) {
    console.error(error)
    return { props: null }
  }
}

export default function Blog({ post, prev, next, postUrl }) {
  let strtags = post.attributes.tags || NONE
  let tags = strtags.split(' ')

  let keyword = '(/uploads/'

  const modifiedcontent = post.attributes.content
    .split('(/uploads/')
    .splice(0, keyword.length)
    .join(`(${process.env.BACKEND_URL}/uploads/`)
  return (
    <>
      <SectionContainer>
        <Head>
          <title>{post.attributes.title}</title>
        </Head>

        <ScrollTopAndComment />
        <article>
          <div className="xl:divide-y xl:divide-gray-200 xl:dark:divide-gray-700">
            <header className="pt-6 xl:pb-5">
              <div className="space-y-1 text-center">
                <dl className="space-y-10">
                  <div>
                    <dt className="sr-only">Published on</dt>
                    <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                      <time dateTime={post.attributes.date}>
                        <BsCalendarDate className="mr-1.5 -mt-1.5 inline h-4 w-4" />
                        {new Date(post.attributes.date).toLocaleDateString(siteMetadata.locale)}
                      </time>
                    </dd>
                  </div>
                </dl>
                <div>
                  <PageTitle>Blog Details</PageTitle>
                </div>
                <div className="flex justify-center gap-5 py-4">
                  <span className="flex items-center gap-1.5">
                    <HiOutlinePencil className="h-5 w-5" />
                    {post.attributes.content.split(' ').length} words
                  </span>
                  <span className="flex items-center gap-1.5">
                    <HiOutlineClock className="h-5 w-5" />
                    {post.attributes.readingtime}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <HiOutlineEye className="h-5 w-5" />
                    {/* <ViewCounter className="ml-0" slug="" blogPage={true} /> */}
                    <div className="-ml-0.5">Views</div>
                  </span>
                </div>
              </div>
            </header>
            <div
              className="divide-y divide-gray-200 pb-8 dark:divide-gray-700 xl:grid xl:grid-cols-4 xl:gap-x-6 xl:divide-y-0"
              style={{ gridTemplateRows: 'auto 1fr' }}
            >
              <dl className="pt-6 pb-10 xl:border-b xl:border-gray-200 xl:pt-11 xl:dark:border-gray-700">
                <dt className="sr-only">Authors</dt>
                <dd>
                  <ul className="flex justify-center space-x-8 sm:space-x-12 xl:block xl:space-x-0 xl:space-y-8">
                    <li className="flex items-center space-x-2">
                      <Image
                        src={`${process.env.BACKEND_URL}${post.attributes.Avtar.data[0].attributes.url}`}
                        width="38px"
                        height="38px"
                        alt="avatar"
                        className="h-10 w-10 rounded-full object-contain"
                        placeholder="blur"
                        blurDataURL="/static/images/SVG-placeholder.png"
                      />

                      <dl className="whitespace-nowrap text-sm font-medium leading-5">
                        <dt className="sr-only">Name</dt>
                        <dd className="text-gray-900 dark:text-gray-100">
                          {post.attributes.author}
                        </dd>
                        <dt className="sr-only">Linkdin</dt>
                        <dd>
                          <Link
                            passHref={true}
                            href="/about"
                            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                          >
                            <span>
                              About
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                className="ml-0.5 inline-block h-4 w-4 fill-current"
                              >
                                <g data-name="Layer 2">
                                  <g data-name="external-link">
                                    <rect width="24" height="24" opacity="0" />
                                    <path d="M20 11a1 1 0 0 0-1 1v6a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h6a1 1 0 0 0 0-2H6a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3v-6a1 1 0 0 0-1-1z" />
                                    <path d="M16 5h1.58l-6.29 6.28a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0L19 6.42V8a1 1 0 0 0 1 1 1 1 0 0 0 1-1V4a1 1 0 0 0-1-1h-4a1 1 0 0 0 0 2z" />
                                  </g>
                                </g>
                              </svg>
                            </span>
                          </Link>
                        </dd>
                      </dl>
                    </li>
                  </ul>
                </dd>
              </dl>
              <div className="divide-y divide-gray-200 dark:divide-gray-700 xl:col-span-3 xl:row-span-2 xl:pb-0">
                <div className="prose m-auto w-fit max-w-none pt-10 pb-8 dark:prose-dark lg:w-max">
                  <h1>{post.attributes.title}</h1>
                </div>
                <div>
                  <div>
                    <Image
                      src={`${process.env.BACKEND_URL}${post.attributes.backgroundImg.data.attributes.url}`}
                      width="1200px"
                      height="800px"
                      alt={post.attributes.backgroundImg.data.name}
                      className="my-10 h-full w-full scale-[0.9] transform rounded-lg object-cover transition-all duration-1000 ease-in-out hover:scale-[1] hover:cursor-pointer"
                      // placeholder="blur"
                      // blurDataURL="/static/images/SVG-placeholder.png"
                    />
                  </div>
                </div>
                <ReactMarkdown className="prose w-[100%] max-w-none pt-10 pb-8 dark:prose-dark">
                  {modifiedcontent}
                </ReactMarkdown>
                <div className="grid place-items-center pt-6 pb-6 text-sm text-gray-700 dark:text-gray-300">
                  <div className="flex items-center space-x-4">
                    <TwitterShareButton
                      url={postUrl}
                      title={post.attributes.title}
                      // via={siteMetadata.socialAccount.twitter}
                      className="flex items-center overflow-hidden rounded-full !bg-[#1da1f2] hover:scale-110"
                    >
                      <SocialIcon
                        network="twitter"
                        style={{ height: 35, width: 35 }}
                        fgColor="#fff"
                        bgColor="#1da1f2"
                      />
                    </TwitterShareButton>
                    <FacebookShareButton
                      url={postUrl}
                      quote={post.attributes.title}
                      className="flex items-center overflow-hidden rounded-full !bg-[#1877f2] hover:scale-110"
                    >
                      <SocialIcon
                        network="facebook"
                        style={{ height: 35, width: 35 }}
                        fgColor="#fff"
                        bgColor="#1877f2"
                      />
                    </FacebookShareButton>
                    <EmailShareButton
                      body={'Check out this blog'}
                      subject={post.attributes.title}
                      separator=" : "
                      url={postUrl}
                      className="flex items-center overflow-hidden rounded-full !bg-[#B61AC1] hover:scale-110"
                    >
                      <SocialIcon
                        network="email"
                        style={{ height: 35, width: 35 }}
                        fgColor="#fff"
                        bgColor="#B61AC1"
                      />
                    </EmailShareButton>
                    <LinkedinShareButton
                      summary={'Check out this blog'}
                      title={post.attributes.title}
                      source={siteMetadata.siteUrl}
                      url={postUrl}
                      className="flex items-center overflow-hidden rounded-full !bg-[#0072b1] hover:scale-110"
                    >
                      <SocialIcon
                        network="linkedin"
                        style={{ height: 35, width: 35 }}
                        fgColor="#fff"
                        bgColor="#0072b1"
                      />
                    </LinkedinShareButton>
                    <RedditShareButton
                      title={post.attributes.title}
                      url={postUrl}
                      className="flex items-center overflow-hidden rounded-full !bg-[#ff4500] hover:scale-110"
                    >
                      <SocialIcon
                        network="reddit"
                        style={{ height: 35, width: 35 }}
                        fgColor="#fff"
                        bgColor="#ff4500"
                      />
                    </RedditShareButton>
                    <WhatsappShareButton
                      title={post.attributes.title}
                      separator={' : '}
                      url={postUrl}
                      className="flex items-center overflow-hidden rounded-full !bg-[#25D366] hover:scale-110"
                    >
                      <SocialIcon
                        network="whatsapp"
                        style={{ height: 35, width: 35 }}
                        fgColor="#fff"
                        bgColor="#25D366"
                      />
                    </WhatsappShareButton>
                  </div>
                </div>
                {/* <Comments frontMatter={frontMatter} /> */}
              </div>
              <footer>
                <div className="divide-gray-200 text-sm font-medium leading-5 dark:divide-gray-700 xl:col-start-1 xl:row-start-2 xl:divide-y">
                  {tags && (
                    <div className="py-4 xl:py-8">
                      <h2 className="pb-1 text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                        Tags
                      </h2>
                      <div className="flex flex-wrap">
                        {tags.map((tag, key) => (
                          <a
                            key={key}
                            className="mt-2 mr-3 rounded-lg border border-primary-500 py-1 px-3 text-sm font-medium uppercase text-primary-500 transition duration-500 ease-in-out hover:bg-primary-500 hover:text-gray-100 dark:hover:text-gray-900"
                          >
                            {tag}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                  {(next || prev) && (
                    <div className="flex justify-between py-4 xl:block xl:space-y-8 xl:py-8">
                      {prev && (
                        <div>
                          <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                            Previous Article
                          </h2>
                          <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                            <Link href={`/blog/${prev.attributes.slug}`}>
                              {prev.attributes.title}
                            </Link>
                          </div>
                        </div>
                      )}
                      {next && (
                        <div>
                          <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                            Next Article
                          </h2>
                          <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                            <Link href={`/blog/${next.attributes.slug}`}>
                              {next.attributes.title}
                            </Link>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <div className="pt-4 xl:pt-8">
                  <Link
                    href="/blog"
                    className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                  >
                    &larr; Back to the blog
                  </Link>
                </div>
              </footer>
            </div>
          </div>
        </article>
      </SectionContainer>
    </>
  )
}
