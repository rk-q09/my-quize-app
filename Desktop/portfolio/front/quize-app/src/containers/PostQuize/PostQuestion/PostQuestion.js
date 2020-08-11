import React, { useState, useEffect } from 'react';
import axios from '../../../axios-base';

import styles from './PostQuestion.module.css';

const PostQuestion = props => {
    const [questionContent, setQuestionContent] = useState("");

    const [questionSize, setQuestionSize] = useState(0);
    
    const questionRegistrationHandler = event => {
        axios.post('/quizes/' + props.match.params.id + '/questions', {
            content: questionContent
        }).then(response => {
            console.log("Post Question", response);
            localStorage.setItem('quize_id', props.match.params.id);
            props.history.push( '/questions/' + response.data.id + '/new' );
        }).catch(error => {
            console.log(error);
        });
        event.preventDefault();
    };

    const inputChangedHandler = event => {
        setQuestionContent(event.target.value);
    }

    const getQuestionSize = () => {
        axios.get('/quizes/' + props.match.params.id)
            .then(response => {
                setQuestionSize(response.data.questions.length + 1);
            })
            .catch(error => {
                console.log(error);
            });
    };

    useEffect(() => {
        getQuestionSize();
    }, [])


    return (
       <div className={styles.PostQuestion}>
           <p>{questionSize}問目</p>
           <p>質問文を入力して下さい</p>
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