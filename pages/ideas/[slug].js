import { getIdeaPaths, fetchGraphQLAsync } from "@/utils/contentful"
import { queries } from "@/utils/query";
import Home from '@/pages/index.js'
import { useRouter } from "next/router";
import IdeaModal from "@/components/idea-modal";

export default function Thought({ modalContent }){

    const router = useRouter()

    return (
        <span onClick={(e) => {
            const homeElements = ['sky', 'ground']
            homeElements.includes(e.target.id) && router.push('/')
        }}>
            <Home />
            {/* TODO: Change this to Idea Tooltip modal */}
            <IdeaModal positionModalInGarden={false} idea={modalContent} setIsIdeaModalOpen={null} />
        </span>
    )
}

export async function getStaticPaths() {
    const paths = await getIdeaPaths()
    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps ({ params }) {
    const query = `{ ${queries.ideas} }`

    const content = await fetchGraphQLAsync(query)
    const modalContent = content.data.ideaCollection.items.filter(({ slug }) => slug === params.slug)[0]

    return {
        props: {
          modalContent,
        },
      };
}