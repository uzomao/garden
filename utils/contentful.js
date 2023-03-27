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

const parseRichText = (richText, links=null) => {
  const options = {
      renderMark: {
          [MARKS.BOLD]: text => `<custom-bold>${text}<custom-bold>`
      },
      renderNode: {
          // I had to write my own function, the one in the original documentation was not working
          [BLOCKS.EMBEDDED_ASSET]: (node) => {
            const assetId = node.data.target.sys.id
            const asset = links.assets.block.filter((block) => block.sys.id === assetId)
            return `<img src=${asset[0].url} width=${250} />`
          }
      }
  }

  return links ? documentToHtmlString(richText, options): documentToHtmlString(richText)
}

export { fetchGraphQL, fetchGraphQLAsync, getAllContent, getThoughtPaths, parseRichText }

