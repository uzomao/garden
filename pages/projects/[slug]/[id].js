import { getIdeaUpdatePaths, fetchGraphQLAsync } from "@/utils/contentful"
import Home from '@/pages/index.js'
import { useRouter } from "next/router";
import ModalOverlay from "@/components/modal-overlay";
import ClickAway from "@/components/utils/click-away";
import { contentTypes } from "@/utils/helpers";

export default function Update({ postContent }){

    const router = useRouter()

    return (
        <ClickAway>
            <Home />
            <ModalOverlay postContent={postContent} contentType={contentTypes.updates} />
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

const queries = {
    ideaUpdates: `
      {
        ideaUpdateCollection {
          items {
            title
            body {
              json
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
    `
  };

export async function getStaticProps ({ params }) {
    const query = queries.ideaUpdates

    const content = await fetchGraphQLAsync(query)
    
    const postContent = content.data.ideaUpdateCollection.items.find(
        ({ sys }) => sys.id === params.id
      ) || null; // Set to null if not found

    return {
        props: {
          postContent,
        },
      };
}