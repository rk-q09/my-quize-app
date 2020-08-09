import React from 'react';

const QuestionTitle = props => {

    const questionSelectedHandler = (id) => {
        props.history.push( '/quizes/' + id );
        console.log('Clicked the question that number of', id);
    };

    return (
        <div>
            <h1 onClick={() => questionSelectedHandler(props.id)}>{props.title}</h1>  
        </div>
    );
};

export default QuestionTitle;