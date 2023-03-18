import { getThoughtPaths, fetchGraphQLAsync } from "@/utils/contentful"
import { queries } from "@/utils/query";

export default function Thought({ postContent }){
    return <div>
                <h2>{postContent.title}</h2>
            </div>
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