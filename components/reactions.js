import reactionStyles from '@/styles/reaction.module.css'
import { supabase } from '@/utils/supabase'
import { useEffect, useState } from 'react'

export default function Reactions({ postContent }) {
    const reactions = {
        hot: '🤩',
        warm: '👍🏾',
        cold: '😕'
    }

    const [reactionsCount, setReactionsCount] = useState({})

    const createPostReactions = async () => { 
        const { data, error } = await supabase
            .from('reactions')
            .insert([
                { post_id: postContent.slug, hot: 0, warm: 0, cold: 0 },
            ])
            if(error){console.log(error)}
            else {
                setReactionsCount({hot: 0, warm: 0, cold: 0})
                console.log('reactions created')
            }
    }

    const getPostReactions = async () => {
        let { data: reactions, error } = await supabase
        .from('reactions')
        .select('*')
        .eq('post_id', postContent.slug)
        if(error){console.log(error)}
        else if(reactions.length === 0){
            createPostReactions()
        }
        else {
            const currentPostReactions = reactions[0]
            setReactionsCount({hot: currentPostReactions.hot, warm: currentPostReactions.warm, cold: currentPostReactions.cold})
        }
    }

    useEffect(() => {
        getPostReactions()
      }, [])

    const showReactionsCount = (reactionTemperature) => {
        if(reactionsCount.hot !== undefined){ //just using hot as an instance
            if(reactionTemperature === reactions.hot){
                return reactionsCount.hot
            } else if(reactionTemperature === reactions.warm){
                return reactionsCount.warm
            } else if(reactionTemperature === reactions.cold){
                return reactionsCount.cold
            }
        } else {
            return ''
        }
    }

    const updateReactionsCountSupabase = async (newReactionsCount) => {
        const { data, error } = await supabase
            .from('reactions')
            .update(newReactionsCount)
            .eq('post_id', postContent.slug)
            if(error){console.log(error)}
            else {
                console.log(data)
            }
    } 

    const updateReactionsCount = (reactionTemperature) => {
        let currentCount = reactionsCount[reactionTemperature]
        const newObj = {...reactionsCount, [reactionTemperature]: currentCount + 1 }
        setReactionsCount(newObj)
        updateReactionsCountSupabase(newObj)
    }

    return (
        <div>
            <ul className={reactionStyles.list}>
                <li onClick={() => updateReactionsCount('hot')}>{reactions.hot} <span className={reactionStyles.count}>{`(${showReactionsCount(reactions.hot)})`}</span></li>
                <li onClick={() => updateReactionsCount('warm')}>{reactions.warm} <span className={reactionStyles.count}>{`(${showReactionsCount(reactions.warm)})`}</span></li>
                <li onClick={() => updateReactionsCount('cold')}>{reactions.cold} <span className={reactionStyles.count}>{`(${showReactionsCount(reactions.cold)})`}</span></li>
            </ul>
        </div>
    )
}