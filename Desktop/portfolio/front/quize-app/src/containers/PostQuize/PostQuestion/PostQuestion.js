import React, { useState } from 'react';
import axios from '../../../axios-base';

import styles from './PostQuestion.module.css';

const PostQuestion = props => {
    const [questionContent, setQuestionContent] = useState("");
    
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


    return (
       <div className={styles.PostQuestion}>
           <form onSubmit={questionRegistrationHandler}>
               <input
                   type="text"
                   name="content"
                   placeholder="Question" 
                   value={questionContent}
                   onChange={inputChangedHandler}
                   required
                />
                <button>質問を投稿する</button>
           </form>
       </div>
    );
};


export default PostQuestion;