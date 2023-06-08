import { getUpdatePaths, fetchGraphQLAsync } from "@/utils/contentful"
import { queries } from "@/utils/query";
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
    const paths = await getUpdatePaths()
    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps ({ params }) {
    const query = `{ ${queries.updates} }`

    const content = await fetchGraphQLAsync(query)
    const postContent = content.data.updatesCollection.items.filter(({ slug }) => slug === params.slug)[0]

    return {
        props: {
          postContent,
        },
      };
}