import commentStyles from '@/styles/comment.module.css'
import { supabase } from '@/utils/supabase'
import { useEffect, useState } from 'react'

export default function Comment ({ postContent }){

    const submitComment = async () => {
        const commentField = document.getElementById('comment')

        const { error } = await supabase
            .from('comments')
            .insert([
                { text: commentField.value, post_id: postContent.slug },
        ])
        if(error) console.log(error)
        else {
            // 'artificially' setting the comments here so that the list of comments can be rendered properly
            setComments([{text: commentField.value, created_at: 'just now'}, ...comments])
            const commentNotification = document.getElementById('comment-notification')
            commentNotification.style.display = 'block'

            setTimeout(() => {
                commentNotification.style.display = 'none'
            }, 2500);
            commentField.value = ''
        }
    }

    const [comments, setComments] = useState(null)

    const getComments = async () => {
        let { data: comments, error } = await supabase
            .from('comments')
            .select('*')
            .eq('post_id', postContent.slug)
            .order('created_at', { ascending: false })
            if(error) console.log(error)
            else {
                setComments(comments)
            }
    }

    useEffect(() => {
      getComments()
    
    //   return () => {
    //     second
    //   }
    }, [])
    


    return (
        <div className={commentStyles.section}>
            <h3>Thoughts on {postContent.title}</h3>
            <small id='comment-notification' className={commentStyles.notification}>comment posted!</small>
            <div className={commentStyles.form}>
                <input type="text" id='comment' placeholder='share your thoughts...'/>
                <button onClick={() => submitComment()}>share</button>
            </div>
            {
                comments && comments.reverse().map(({ text, created_at}) => 
                    <div className={commentStyles.comment}>
                        <p>{text}</p>
                        <small>{created_at}</small>
                    </div>
                )
            }
        </div>
    )
}