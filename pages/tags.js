/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */

import Link from '@/components/Link'
import { PageSEO } from '@/components/SEO'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import kebabCase from '@/lib/utils/kebabCase'
import axios from 'axios'

export async function getServerSideProps() {
  try {
    const apiUrl = `${process.env.BACKEND_URL}/api/blogs`
    const response = await axios.get(apiUrl)
    const data = response.data.data

    // Initialize an object to store tag counts
    const tagCounts = {}

    // Iterate over each blog
    data.forEach((blog) => {
      // Get the tags field from the blog and split it by spaces
      const tags = blog.attributes.tags.toLowerCase().split(' ')

      // Iterate over each tag in the split tags array
      tags.forEach((tag) => {
        // Increment the tag count in the object
        tagCounts[tag] = (tagCounts[tag] || 0) + 1
      })
    })

    // Prepare the tags array
    const tags = Object.keys(tagCounts)

    // Prepare the tagCount object
    const tagCount = tags.reduce((obj, tag) => {
      obj[tag] = tagCounts[tag]
      return obj
    }, {})
    // convert the tagcount objects to arra
    let tagCountArray = Object.entries(tagCount).map(([tag, count]) => ({
      tag,
      count,
    }))
    tagCountArray = tagCountArray.filter(({ tag }) => tag.length >= 2)

    // Return the tags and tagCount separately
    return {
      props: {
        tagCountArray,
      },
    }
  } catch (error) {
    console.error('Error:', error)
    return {
      props: {
        tagCountArray: [],
      },
    }
  }
}

export default function Tags({ tagCountArray }) {
  return (
    <>
      <PageSEO title={`Tags - ${siteMetadata.author}`} description="Things I blog about" />
      <div className="flex flex-col items-start justify-start divide-y divide-gray-200 dark:divide-gray-700 md:mt-24 md:flex-row md:items-center md:justify-center md:space-x-6 md:divide-y-0">
        <div className="space-x-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:border-r-2 md:px-6 md:text-6xl md:leading-14">
            Tags
          </h1>
        </div>
        <div className="flex max-w-lg flex-wrap">
          {/* {Object.keys(tags).length === 0 && 'No tags found.'} */}
          {tagCountArray.map((t) => {
            return (
              <div key={t} className="mt-2 mb-2 mr-5">
                <Tag text={t.tag} />
                <Link
                  href={`/tags/${kebabCase(t)}`}
                  className="-ml-2 text-sm font-semibold uppercase text-gray-600 dark:text-gray-300"
                >
                  {` (${t.count})`}
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
