import styles from '@/styles/expanded-sky.module.css'
import { useState } from 'react'
import { formatDate, contentTypes } from '@/utils/helpers';
import useModal from "@/hooks/use-modal"

import ModalOverlay from './modal-overlay';
import IdeaModal from './idea-modal';

export default function ExpandedSky({ content }) {
    console.log(content);

    const [ activeContentType, setActiveContentType ] = useState(contentTypes.thoughts)
    const [ currentIdea, setCurrentIdea ] = useState(null)

    const getActiveClass = (contentType) => {
        return activeContentType === contentType ? styles.active : '' 
    }

    const data = {
        thoughts: content.thoughts.blogPostCollection.items,
        projects: content.projects.ideaCollection.items,
        updates: content.updates.updatesCollection.items
    }

    const { thoughts, projects, updates } = data

  const { modalState, setModalState, changeModalState } = useModal()

  const displayModal = () => {
    if(activeContentType === contentTypes.thoughts){
        return <ModalOverlay
            postContent={thoughts.filter(({ slug }) => slug === modalState.contentSlug)[0]}
            setModalState={setModalState}
        />
    } else if(activeContentType === contentTypes.updates){
        return <ModalOverlay
            postContent={updates.filter(({ slug }) => slug === modalState.contentSlug)[0]}
            setModalState={setModalState}
            contentType={contentTypes.updates}
        />
    } else {
        return <IdeaModal
            positionModalInGarden={false}
            idea={currentIdea}
            setIsIdeaModalOpen={setModalState}
        />
    }
  }


    return (
        <main className={styles.container}>
            <div className={styles.contentsection}>
                <div className={styles.toggler}>
                    <p onClick={() => setActiveContentType(contentTypes.thoughts)} className={`${getActiveClass(contentTypes.thoughts)}`}>Thoughts</p>
                    <p className={styles.divider}>|</p>
                    <p onClick={() => setActiveContentType(contentTypes.ideas)} className={`${getActiveClass(contentTypes.ideas)}`}>Ideas</p>
                    <p className={styles.divider}>|</p>
                    <p onClick={() => setActiveContentType(contentTypes.updates)} className={`${getActiveClass(contentTypes.updates)}`}>Updates</p>
                </div>
                <div className={styles.content}>
                    {
                        activeContentType === contentTypes.thoughts ? (
                            thoughts && thoughts.map(({ title, slug, date }) => (
                                <div className={styles.piece} key={slug}>
                                    <h2 onClick={() => changeModalState(true, slug)}>{title}</h2>
                                    <p>{formatDate(date)}</p>
                                </div>
                            ))
                        ) : activeContentType === contentTypes.updates ? (
                                updates && updates.map(({ title, slug, date }) => (
                                    <div className={styles.piece} key={slug}>
                                        <h2 onClick={() => changeModalState(true, slug)}>{title}</h2>
                                        <p>{formatDate(date)}</p>
                                    </div>
                                ))
                        ) : (
                            projects && projects.map((project) => {
                                const { title, slug, date } = project;
                                return (
                                    <div className={styles.piece} key={slug}>
                                        <h2 onClick={() => {
                                            changeModalState(true, slug);
                                            setCurrentIdea(project);
                                        }}>{title}</h2>
                                        <p>{formatDate(date)}</p>
                                    </div>
                                );
                            })
                        )
                    }
                </div>
            </div>
            { modalState.isOpen && displayModal() }
        </main>
    )

}