import React from 'react';
import axios from '../../../axios-base';

import styles from './QuestionTitle.module.css';

const QuestionTitle = props => {

    const questionSelectedHandler = (id) => {
        props.history.push( '/quizes/' + id );
    };

    const deleteQuizeHandler = id => {
        axios.delete('/quizes/' + id)
            .then(response => {
                window.location.reload();
            })
    };

    return (
        <div className={styles.QuestionTitle}>
            <p onClick={() => questionSelectedHandler(props.id)}>{props.title}</p> 
            {props.authorized ? (
                <button 
                    onClick={() => { if (window.confirm('本当に削除してもよいですか?')) deleteQuizeHandler(props.id)}} 
                    className={styles.DeleteButton}>
                        delete
                </button> 
            ) :
            null}
        </div>
    );
};

export default QuestionTitle;