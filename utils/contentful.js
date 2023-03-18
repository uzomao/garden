import { queries } from '@/utils/query'
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { BLOCKS, MARKS } from '@contentful/rich-text-types';

const fetchGraphQL = (query) => {
    return fetch(
      `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
        },
        body: JSON.stringify({ query }),
      }
    ).then((response) => response.json());
}

async function fetchGraphQLAsync(query) {
  return fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
      },
      body: JSON.stringify({ query }),
    }
  ).then((response) => response.json());
}

async function getAllContent() {
  const content = await fetchGraphQL(`{ ${queries.thoughts}, ${queries.ideas} }`)
  return content
}

async function getThoughtPaths (arg){
  const content = await getAllContent()
  const slugs = []
  content.data.blogPostCollection.items.forEach(item => {
    slugs.push({
      params: {
        slug: item.slug
      }
    })
  })
  return slugs
}

const parseRichText = (richText) => {
  const options = {
      // renderMark: {
      //     [MARKS.BOLD]: text => `<custom-bold>${text}<custom-bold>`
      // },
      // renderNode: {
      //     [BLOCKS.EMBEDDED_ASSET]: (node) => `<img src=https://${node.data.target.fields.file.url} alt={node.data.target.fields.description}>`
      // }
  }

  return documentToHtmlString(richText, options)
}

export { fetchGraphQL, fetchGraphQLAsync, getAllContent, getThoughtPaths, parseRichText }

