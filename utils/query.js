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
        query GetIdeaUpdates($ideaId: String!, $limit: Int!) {
            ideaUpdateCollection(where: { idea: { sys: { id: $ideaId }}}, limit: $limit) {
                total
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
                    plant
                }
            }
        }
    `,
    ideaUpdatesNoContent: `
        ideaUpdateCollection {
            items {
                sys {
                    id
                }
                title
                idea {
                    slug
                    sys {
                        id
                    }
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
                imagesCollection(limit: 1) {
                    items {
                        url
                        fileName
                        title
                    }
                }
                text
                category
                year
                slug
            }
        }
    `,
    portfolioTech: `
        techCollection {
            items {
            title
            imageCollection(limit: 1) {
                items {
                    url
                    fileName
                    title
                }
            }
            description
            dateCompleted
            projectType
            tags
            slug
            }
        }
    `
}

export { queries }