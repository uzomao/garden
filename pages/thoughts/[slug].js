import { getThoughtPaths, fetchGraphQLAsync } from "@/utils/contentful"
import { queries } from "@/utils/query";
import Home from '@/pages/index.js'
import { useRouter } from "next/router";
import ModalOverlay from "@/components/modal-overlay";
import ClickAway from "@/components/utils/click-away";

export default function Thought({ postContent }){

    const router = useRouter()

    return (
        <ClickAway>
            <Home />
            <ModalOverlay postContent={postContent} />
        </ClickAway>
    )
}

export async function getStaticPaths() {
    const paths = await getThoughtPaths()
    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps ({ params }) {
    const query = `{ ${queries.thoughts} }`

    const content = await fetchGraphQLAsync(query)
    const postContent = content.data.blogPostCollection.items.find(({ slug }) => slug === params.slug)

    return {
        props: {
          postContent,
        },
      };
}