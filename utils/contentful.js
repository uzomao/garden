import { queries } from '@/utils/query'
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { BLOCKS, MARKS } from '@contentful/rich-text-types';
import { queryDatasources } from './helpers';

const { gardenContentful } = queryDatasources

const getApiRequestCredentials = (dataSource) => {
  if (dataSource === gardenContentful) {
    return {
      spaceId: process.env.CONTENTFUL_SPACE_ID,
      accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
    };
  } else {
    return {
      spaceId: process.env.PORTFOLIO_CONTENTFUL_SPACE_ID,
      accessToken: process.env.PORTFOLIO_CONTENTFUL_ACCESS_TOKEN
    };
  }
};

const fetchGraphQL = (query, variables, dataSource=gardenContentful) => {
    const { spaceId, accessToken} = getApiRequestCredentials(dataSource)

    return fetch(
      `https://graphql.contentful.com/content/v1/spaces/${spaceId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ query, variables }),
      }
    ).then((response) => response.json());
}

async function fetchGraphQLAsync(query, variables) {
  return fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
      },
      body: JSON.stringify({ query, variables }),
    }
  ).then((response) => response.json());
}

async function getAllContent() {
  const content = await fetchGraphQL(`{ ${queries.thoughts}, ${queries.ideas} ${queries.updates} }`)
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

async function getIdeaPaths (arg){
  const content = await getAllContent()
  const slugs = []
  content.data.ideaCollection.items.forEach(item => {
    slugs.push({
      params: {
        slug: item.slug
      }
    })
  })
  return slugs
}

async function getUpdatePaths (arg){
  const content = await getAllContent()
  const slugs = []
  content.data.updatesCollection.items.forEach(item => {
    slugs.push({
      params: {
        slug: item.slug
      }
    })
  })
  return slugs
}

async function getIdeaUpdatePaths (arg){
  const content = await fetchGraphQL(`{ ${queries.ideaUpdatesNoContent} }`)
  const ids = []
  content.data.ideaUpdateCollection.items.forEach(item => {
    ids.push({
      params: {
        slug: item.idea.slug,
        id: item.sys.id
      }
    })
  })
  return ids
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
            return `<img src=${asset[0].url} />`
          }
      }
  }

  return links ? documentToHtmlString(richText, options): documentToHtmlString(richText)
}

export { fetchGraphQL, 
          fetchGraphQLAsync, 
          getAllContent, 
          getThoughtPaths, 
          getIdeaPaths, 
          getUpdatePaths, 
          getIdeaUpdatePaths, 
          parseRichText 
        }

