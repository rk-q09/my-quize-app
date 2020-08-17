import React, { useState, useEffect } from 'react';
import styles from './About.module.css';
import axios from '../../axios-base.js';

import QuestionTitle from '../GetQuize/QuestionTitle/QuestionTitle';

const About = props => {
    const [quizeList, setQuizeList] = useState([]);

    const getNewQuizes = () => {
        axios.get('/new_quizes')
            .then(res => {
                console.log(res.data);
                const fetchedQuizeList = [];
                for (let key in res.data) {
                    fetchedQuizeList.push({
                        id: res.data[key].id,
                        title: res.data[key].title
                    });
                }
                setQuizeList(fetchedQuizeList);
            })
            .catch(error => {
                console.log(error);
            });
    };

    const quizes = quizeList.map( question => {
        return (
            <QuestionTitle 
                key={question.id}
                title={question.title}
                id={question.id}
                history={props.history}
                authorized={false}
            />
        );
    });

    useEffect(() => {
        getNewQuizes();
    }, []);

    return (
        <div className={styles.About}>
            <h3>Welcome To QuizeApp</h3>
            <p>クイズに挑戦してみよう</p>
            <section>
                {quizes}
            </section>
        </div>
    );

}

export default About;