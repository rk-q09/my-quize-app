import React, { useState, useEffect } from 'react';
import axios from '../../../axios-base';

import QuestionTitle from '../QuestionTitle/QuestionTitle';
import styles from './OtherUsersQuizeList.module.css';

const OtherUsersQuizeList = props => {
    const [otherUsersQuizeList, setOtherUsersQuizeList] = useState([]);
    const [userName, setUserName] = useState('');

    const getOtherUsersQuizeList = () => {
        axios.get('/users/' + props.match.params.id + ' /quizes')
            .then(res => {
                console.log("QuizeList", res.data);
                const fetchedQuizeList = [];
                for (let key in res.data) {
                    fetchedQuizeList.push({
                        id: res.data[key].id,
                        title: res.data[key].title,
                    });
                }
                setOtherUsersQuizeList(fetchedQuizeList);
            });
    }

    const getUserName = () => {
        axios.get('/users/' + props.match.params.id)
            .then(res => {
                setUserName(res.data.user_name);
            });
    };

    useEffect(() => {
        getOtherUsersQuizeList();
        getUserName();
    }, []);

    const quizes = otherUsersQuizeList.map( question => {
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

    return (
        <div className={styles.OtherUsersQuizeList}>
            <h2>{userName}'s Quize</h2>
            <section>
                {quizes}
            </section>
        </div>
    );
}

export default OtherUsersQuizeList;