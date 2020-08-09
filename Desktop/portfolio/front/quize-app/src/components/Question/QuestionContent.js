import React from 'react';
import styles from './QuestionContent.module.css';

const QuestionContent = props => {
    return (
        <div className={styles.QuestionContent}>{props.content}</div>
    );
};


export default QuestionContent;