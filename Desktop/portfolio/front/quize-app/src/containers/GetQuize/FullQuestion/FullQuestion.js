import React, { useState, useEffect } from 'react';
import axios from '../../../axios-base';

import QuestionContent from  '../../../components/Question/QuestionContent';
import QuizeResults from '../QuizeResults/QuizeResults';
import styles from './FullQuestion.module.css';

const FullQuestion = props => {
    const [questionsData, setQuestionsData] = useState([]);
    const [questionSize, setQuestionSize] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [gameEnded, setGameEnded] = useState(false);

    const setQuestions = () => {
        if ( props.match.params.id ) {
            axios.get('/quizes/' + props.match.params.id)
            .then(res => {
                const fetchedQuestions = [];
                for (let key in res.data.questions) {
                    fetchedQuestions.push({
                        id: res.data.questions[key].id,
                        content: res.data.questions[key].content,
                        choices: res.data.questions[key].choices
                    });
                }
                setQuestionSize(res.data.questions.length);
                setQuestionsData(fetchedQuestions);
            });
        };
    };

    useEffect(() => {
        setQuestions();
    }, []);
    
    const answerQuestionHandler = (answer) => {
        setCurrentIndex(currentIndex + 1);

        if (answer) {
            setScore(score + 1);
        };
      
        if(currentIndex + 1 >= questionSize) {
            setGameEnded(true);
        }
    }
      
    return gameEnded ? (
        <QuizeResults 
            score={score}
            quizeLength={questionsData.length} 
            quizeId={props.match.params.id}
            history={props.history}
            match={props.match}
        />
    ) : questionsData.length > 0 ? (
        <div>
           <QuestionContent content={questionsData[currentIndex].content} />
           <div className={styles.Choices}>
                {questionsData[currentIndex].choices.map(choice => {
                    return (
                        <button 
                            key={choice.id}
                            className={styles.QuestionButton}
                            onClick={() => answerQuestionHandler(choice.is_answer)} >{choice.content}
                        </button>
                    );
                })}
           </div>
        </div>
    ) : (
        <p style={{ textAlign: 'center'}}>Loading...</p>
    );
}

export default FullQuestion;