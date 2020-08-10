import React from 'react';

import styles from './QuizeResults.module.css';

const QuizeResults = props => {
    return (
        <div className={styles.QuizeResults}>
            <p>YOUR　SCORE WAS {props.score} / {props.quizeLength} </p>
        </div>
    );
};

export default QuizeResults;