import { getThoughtPaths, fetchGraphQLAsync } from "@/utils/contentful"
import { queries } from "@/utils/query";
import Home from '@/pages/index.js'
import { useRouter } from "next/router";
import ModalOverlay from "@/components/modal-overlay";
import { useState } from "react";

export default function Thought({ postContent }){

    const router = useRouter()

    return (
        <span onClick={(e) => {
            const homeElements = ['sky', 'ground']
            homeElements.includes(e.target.id) && router.push('/')
        }}>
            <Home />
            <ModalOverlay postContent={postContent} />
        </span>
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
    const postContent = content.data.blogPostCollection.items.filter(({ slug }) => slug === params.slug)[0]

    return {
        props: {
          postContent,
        },
      };
}