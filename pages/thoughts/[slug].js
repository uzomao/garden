import { getThoughtPaths, fetchGraphQLAsync, parseRichText } from "@/utils/contentful"
import { queries } from "@/utils/query";
import Home from '@/pages/index.js'
import utilStyles from '@/styles/utils.module.css'

export default function Thought({ postContent }){
    return (
        <>
            <Home />
            <div className={utilStyles.overlay}>
                <h2>{postContent.title}</h2>
                <div dangerouslySetInnerHTML={{ __html: parseRichText(postContent.body.json) }} />
            </div>
        </>
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