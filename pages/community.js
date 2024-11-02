import { useState, useEffect } from "react";

import Ground from "@/components/elements/ground"
import CloseBtn from "@/components/close-btn";

import { supabase } from "@/utils/supabase";
import { plantEmojis } from "@/utils/helpers";

import Tooltip from "@/components/modals/tooltip";
import { v4 as uuidv4 } from "uuid";

export default function Community ({ content }) {

    const [ showForm, setShowForm ] = useState(false)
    const [ isFormSubmitted, setIsFormSubmitted ] = useState(false)
    const [ selectedPlant, setSelectedPlant ] = useState('')
    const [ selectedPrompt, setSelectedPrompt ] = useState(null)
    const [ seeds, setSeeds ] = useState([])

    // Tooltip stuff can be moved to a useTooltip hook
    const [tooltip, setTooltip] = useState({
        isOpen: false,
        coords: {
          x: 0,
          y: 0
        },
        content: {}
    })
    const changeTooltip = (isOpen, coords, content) => { 
        closeForm();
        setTooltip({ isOpen, coords, content }) 
    }

    const closeTooltip = () => {
        setTooltip({isOpen: false, coords: {x: 0, y: 0}, content: {}})
    }

    const prompts = [
        "What is your vision for the future of technology?",
        "How do you see art evolving in the next decade?",
        "What role does community play in digital creativity?",
    ];

    const submitForm = async (event) => {
        event.preventDefault()

        const newSeed = {
            name: document.getElementById('name').value,
            response: document.getElementById('response').value,
            plant: selectedPlant,
            prompt: selectedPrompt,
        }
        const { name, response, plant, prompt } = newSeed

        if(name !== '' && response !== '' && plant !== '' && prompt){
            setIsFormSubmitted(true)
            setSeeds((prevSeeds) => [
                ...prevSeeds,
                newSeed
            ])
            const { data, error } = await supabase
                .from('thoughts')
                .insert([ newSeed ])
                if(error) console.log(error)
                else {
                    console.log('form updated!')
                }
        } else {
            alert('Fill in all fields to plant a seed')
        }
    }

    const closeForm = () => {
        setShowForm(false)
        setIsFormSubmitted(false)
        setSelectedPlant('')
        setSelectedPrompt(null)
    }

    useEffect(() => {
      setSeeds(content)
    
      return () => {}
    }, [])

    return (
        <Ground>
            <div className="intro-container">
                <div className="form-container">
                    {
                        showForm ?
                            <form onSubmit={submitForm}>
                                <CloseBtn closeModalFunction={() => setShowForm(false)} />
                                {
                                    isFormSubmitted ?
                                        <h3>Thank you for planting a seed</h3>
                                        :
                                        <>
                                            <h2 className="heading">Plant a seed</h2>
                                            <p>You're invited to share your thoughts on the future of digital</p>
                                        </>
                                }

                                <div className="form-group">
                                    <h4 className="heading">Choose a prompt</h4>
                                    {
                                        isFormSubmitted ?
                                            <p>{selectedPrompt}</p>
                                            :
                                            <select
                                                value={selectedPrompt}
                                                onChange={(e) => setSelectedPrompt(e.target.value)}
                                                className="prompt-dropdown"
                                            >
                                                <option value="" disabled>Select a prompt</option>
                                                {prompts.map((prompt, index) => (
                                                    <option key={index} value={prompt}>
                                                        {prompt}
                                                    </option>
                                                ))}
                                            </select>
                                    }
                                    <h4>Your Response</h4>
                                    {
                                        isFormSubmitted ?
                                            <p>{document.getElementById('response').value}</p>
                                            :
                                            <textarea type="textarea" id="response" placeholder="Your response" />
                                    }
                                </div>

                                <div className="form-group">
                                    <h4 className="heading">Your Name</h4>
                                    {
                                        isFormSubmitted ?
                                            <p>{document.getElementById('name').value}</p>
                                            :
                                            <input type="text" id="name" placeholder="Your name" />
                                    }
                                </div>

                                <div className="form-group plant-selector">
                                    <h4 className="heading">Choose a plant</h4>
                                    {
                                        plantEmojis.map((emoji) => 
                                            <span role="img" 
                                                aria-label="plant emoji" 
                                                onClick={() => setSelectedPlant(emoji)}
                                                className={selectedPlant === emoji ? 'selected' : ''}
                                            >{emoji}</span>
                                        )
                                    }
                                </div>
                                
                                { isFormSubmitted ?
                                    <button id="submit-btn" onClick={() => closeForm()}>Ok!</button>
                                    :
                                    <button id="submit-btn">Plant!</button>
                                }
                            </form>
                            :
                            <button onClick={() => setShowForm(true)}>Plant a seed</button>
                    }
                </div>
                <div className="plants-container">
                    <p className="text-center" style={{color: '#fff', fontSize: '18px'}}>Click on a plant to see its seed</p>
                    <div className="plants">
                        {
                            seeds && seeds.map(({ plant, name, response, prompt, created_at }) => 
                                <div className="plant"
                                    key={uuidv4()}
                                    onClick={(e) => changeTooltip(true, { x: e.target.offsetLeft, y: e.target.offsetTop }, { name: name, response: response, prompt: prompt, date: created_at })}
                                >
                                    <span 
                                        role="img" 
                                        aria-label="plant emoji"
                                        className="thought-plant-emoji"
                                    >{plant}</span>
                                </div>
                            )
                        }
                        {
                            tooltip && tooltip.isOpen &&
                                <Tooltip data={tooltip} closeTooltip={closeTooltip} dimensions={40} />
                        }
                    </div>
                </div>
            </div>
        </Ground>
    )
}