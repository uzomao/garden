const queries = {
    thoughts: `{
        blogPostCollection {
            items {
            title
            body {
                json
            }
            slug
            category
            tags
            }
        }
    }`,
    ideas: `{
        ideaCollection {
            items {
                title
                description
                status
                date
                imagesCollection {
                    items {
                        fileName
                        url
                        }
                    }
                plantPosition
            }
        }
    }`
}

export { queries }