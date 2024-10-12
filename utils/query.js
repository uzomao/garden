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
                date: publishDate
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
                sys {
                    id
                }
                slug
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
    `,
    updates: `
        updatesCollection {
          items {
            title
            date
            body {
              json
            }
            coverImage {
              fileName
              url
            }
            tag
            slug
          }
        }
    `,
    getParentIdea: `
        ideaUpdateCollection {
            items {
                idea {
                    sys {
                        id
                    }
                    title
                }
                date
                plant
            }
        }
    `,
    portfolioVisuals: `
        workCollection {
            items {
                title
                imagesCollection {
                    items {
                    url
                    fileName
                    title
                    }
                }
                text
                category
                year
            }
        }
    `
}

export { queries }