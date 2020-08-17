import React, { useState, useEffect } from 'react';
import axios from '../../../axios-base';

import QuestionTitle from '../QuestionTitle/QuestionTitle';
import styles from './QuizeList.module.css';

const QuizeList = props => {
    const [quizeList, setQuizeList] = useState([]);

    const getQuizeList = () => {
        const user_id = localStorage.getItem('user_id');

        axios.get('/users/' + user_id +' /quizes')
            .then(res => {
                console.log("QuizeList", res.data);
                const fetchedQuizeList = [];
                for (let key in res.data) {
                    fetchedQuizeList.push({
                        id: res.data[key].id,
                        title: res.data[key].title
                    });
                }
                setQuizeList(fetchedQuizeList);
            });
    }

    useEffect(() => {
        getQuizeList();
    }, []);

    const quizes = quizeList.map( question => {
        return (
            <QuestionTitle 
                key={question.id}
                title={question.title}
                id={question.id}
                history={props.history}
                authorized={true}
            />
        );
    });

    return (
        <div className={styles.QuizeList}>
            <section>
                {quizes}
            </section>
        </div>
    );
}

export default QuizeList;