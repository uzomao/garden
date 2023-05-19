const queries = {
    thoughts: `
        blogPostCollection {
            items {
                title
                body {
                    json
                }
                slug
                category
                tags
                publishDate
            }
        }
    `,
    ideas: `
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
                sys {
                    id
                }
            }
        }
    `,
    ideaUpdates: `
        ideaUpdateCollection(limit:10) {
            items {
                title
                body {
                    json
                    links {
                        assets {
                            block {
                                sys {
                                    id
                                }
                                url
                                title
                            }
                        }
                    }
                }
                date
                idea {
                    sys {
                        id
                    }
                    title
                }
                sys {
                    id
                }
            }
        }
    `
}

export { queries }