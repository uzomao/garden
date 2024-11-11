import { getIdeaUpdatePaths, fetchGraphQL, fetchGraphQLAsync } from "@/utils/contentful"
import Home from '@/pages/index.js'
import { useRouter } from "next/router";
import ModalOverlay from "@/components/modal-overlay";
import ClickAway from "@/components/utils/click-away";
import { contentTypes } from "@/utils/helpers";
import { queries } from "@/utils/query";

export default function Update({ postContent }){

    const router = useRouter()

    return (
        <ClickAway>
            <Home />
            <ModalOverlay postContent={postContent} contentType={contentTypes.ideaUpdates} />
        </ClickAway>
    )
}

export async function getStaticPaths() {
    const paths = await getIdeaUpdatePaths()
    return {
        paths,
        fallback: false,
    };
}

const getQuery = (id) => {
    return `
      {
        ideaUpdate(
          id: "${id}"
        ) {
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
    `
  };

export async function getStaticProps ({ params }) {
  
    const query = getQuery(params.id)

    const content = await fetchGraphQLAsync(query)
    
    const postContent = content.data.ideaUpdate

    return {
        props: {
          postContent,
        },
      };
}