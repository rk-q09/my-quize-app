import React, { useState, useEffect } from 'react';
import axios from '../../axios-base';

const PostChoices = props => {
    const [choices, setChoices] = useState({
        choice1: {
            content: "",
            is_answer: false
        },
        choice2: {
            content: "",
            is_answer: false
        },
        choice3: {
            content: "",
            is_answer: false
        },
        choice4: {
            content: "",
            is_answer: false
        }
    });

    const [selectedChoice, setSelectedChoice] = useState("");

    const [questionSize, setQuestionSize] = useState(0);

    const quizeId = localStorage.getItem('quize_id');

    const postChoice = async(choicesNumber) => {
        for ( let i = 1; i <= choicesNumber; i++ ) {
            const choice = `choice${i}`;

            await axios.post('/questions/' + props.match.params.id + '/choices', {
                content: choices[choice].content,
                is_answer: choices[choice].is_answer
            }).then(response => {
                console.log("Post Choices", response);
            }).catch(error => {
                console.log(error);
            });
        };
    };

    const questionRegistrationHandler = event => {
        postChoice(4);
        props.history.push( '/quizes/' + quizeId + '/new' );
        event.preventDefault();
    };

    const inputChangedHandler = event => {
        const updatedChoices = {...choices};
        updatedChoices[event.target.name] = { 
            ...updatedChoices[event.target.name],
            content: event.target.value 
        };
       setChoices(updatedChoices);
    }

    const isAnswerHandler = event => {
        setSelectedChoice(event.target.name);
    };

    const setAnswer = () => {
        const selectedAnswerChoices = {...choices};
        Object.keys(selectedAnswerChoices).map(choice => 
            selectedAnswerChoices[choice] = {
                ...choices[choice],
                is_answer: false
            });
        selectedAnswerChoices[selectedChoice] = {
            ...choices[selectedChoice],
            is_answer: true
        };
        console.log("setAnswer():", selectedAnswerChoices);
        setChoices(selectedAnswerChoices);
    };

    const getQuestionSize = () => {
        axios.get('/quizes/' + quizeId)
            .then(response => {
                console.log("PostChoice#getQuestionSize():", response);
                console.log(response.data.questions.length);
                setQuestionSize(response.data.questions.length);
            })
            .catch(error => {
                console.log(error);
            });
    };

    useEffect(() => {
        setAnswer();
    }, [selectedChoice]);

    useEffect(() => {
        getQuestionSize();
    }, [])

    return (
    <div>
        <p>{questionSize}</p>
        <div>
            <form onSubmit={questionRegistrationHandler}>
                <div>
                <input
                    type="text"
                    name="choice1"
                    placeholder="Choice1" 
                    value={choices.choice1.content}
                    onChange={inputChangedHandler}
                    required
                    />
                </div>
                <div>
                    <input
                    type="text"
                    name="choice2"
                    placeholder="Choice2" 
                    value={choices.choice2.content}
                    onChange={inputChangedHandler}
                    required
                    />
                </div>
                <div>
                    <input
                    type="text"
                    name="choice3"
                    placeholder="Choice3" 
                    value={choices.choice3.content}
                    onChange={inputChangedHandler}
                    required
                    />
                </div>
                <div>
                    <input
                    type="text"
                    name="choice4"
                    placeholder="Choice4" 
                    value={choices.choice4.content}
                    onChange={inputChangedHandler}
                    required
                    />
                </div>
                <div>
                    <label>
                        <input type="radio" name="choice1" checked={selectedChoice === 'choice1'} onChange={isAnswerHandler} />
                        Option1
                    </label>
                    <label>
                        <input type="radio" name="choice2" checked={selectedChoice === 'choice2'} onChange={isAnswerHandler} />
                        Option2
                    </label>
                    <label>
                        <input type="radio" name="choice3" checked={selectedChoice === 'choice3'} onChange={isAnswerHandler} />
                        Option3
                    </label>
                    <label>
                        <input type="radio" name="choice4" checked={selectedChoice === 'choice4'} onChange={isAnswerHandler} />
                        Option4
                    </label>
                </div>
                <button>選択肢を投稿する</button>
            </form>
        </div>
    </div>
    );
}

export default PostChoices