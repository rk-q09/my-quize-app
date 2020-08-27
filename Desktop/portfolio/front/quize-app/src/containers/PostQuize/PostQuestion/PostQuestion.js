import React, { useState, useEffect } from 'react';
import axios from '../../../axios-base';

import styles from './PostQuestion.module.css';

const PostQuestion = props => {
    const [questionContent, setQuestionContent] = useState("");
    const [errorMessages, setErrorMessages] = useState([]);

    const [questionSize, setQuestionSize] = useState(0);
    
    const questionRegistrationHandler = event => {
        axios.post('/quizes/' + props.match.params.id + '/questions', {
            content: questionContent
        }).then(response => {
            if ( response.data.status === "created" ) {
                localStorage.setItem('quize_id', props.match.params.id);
                props.history.push( '/questions/' + response.data.id + '/new' );
            } else {
                setErrorMessages(response.data.errors);
            }
        })
        .catch(error => {
            setErrorMessages([error.message]);
        });
        event.preventDefault();
    };

    const inputChangedHandler = event => {
        setQuestionContent(event.target.value);
    };

    useEffect(() => {
        const getQuestionSize = () => {
            axios.get('/quizes/' + props.match.params.id)
                .then(response => {
                    setQuestionSize(response.data.questions.length + 1);
                });
        };
        getQuestionSize();
    }, [props.match.params.id])


    return (
       <div className={styles.PostQuestion}>
           <p>{questionSize}問目</p>
           <p>質問文を入力して下さい</p>
           {errorMessages.length > 0 ? (
                <div className={styles.ErrorMessages}>
                    <ul>
                        {errorMessages.map(error => (
                            <li key={error}>{error}</li>
                        ))}
                    </ul>
                </div>
            ) : null }
           <form onSubmit={questionRegistrationHandler}>
                <div>
                    <input
                        type="text"
                        name="content"
                        placeholder="Question" 
                        value={questionContent}
                        className={styles.FormInput}
                        onChange={inputChangedHandler}
                        required
                    />
                </div>
                <button className={styles.FormButton}>選択肢を入力する</button>
           </form>
       </div>
    );
};


export default PostQuestion;