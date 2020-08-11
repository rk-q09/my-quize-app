import React from 'react';
import axios from '../../../axios-base';

import styles from './QuestionTitle.module.css';

const QuestionTitle = props => {

    const questionSelectedHandler = (id) => {
        props.history.push( '/quizes/' + id );
        console.log('Clicked the question that number of', id);
    };

    const deleteQuizeHandler = id => {
        axios.delete('/quizes/' + id)
            .then(response => {
                console.log(response);
                window.location.reload();
            })
            .catch(error => {
                console.log(error);
            });
    };

    return (
        <div className={styles.QuestionTitle}>
            <p onClick={() => questionSelectedHandler(props.id)}>{props.title}</p> 
            <button 
                onClick={() => { if (window.confirm('本当に削除してもよいですか?')) deleteQuizeHandler(props.id)}} 
                className={styles.DeleteButton}>
                    delete
            </button> 
        </div>
    );
};

export default QuestionTitle;