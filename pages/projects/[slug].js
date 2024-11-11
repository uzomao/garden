import { getIdeaPaths, fetchGraphQLAsync } from "@/utils/contentful"
import { queries } from "@/utils/query";
import Home from '@/pages/index.js'
import { useRouter } from "next/router";
import IdeaModal from "@/components/idea-modal";
import ClickAway from "@/components/utils/click-away";

export default function Idea({ modalContent }){

    const router = useRouter()

    return (
        <ClickAway>
            <Home />
            <IdeaModal positionModalInGarden={false} idea={modalContent} setIsIdeaModalOpen={null} />
        </ClickAway>
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
    const modalContent = content.data.ideaCollection.items.find(({ slug }) => slug === params.slug)

    return {
        props: {
          modalContent,
        },
      };
}