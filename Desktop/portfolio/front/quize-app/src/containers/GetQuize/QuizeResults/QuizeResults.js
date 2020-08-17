import React, { useState, useEffect } from 'react';
import axios from '../../../axios-base';

import styles from './QuizeResults.module.css';

const QuizeResults = props => {
    const [userId, setUserId] = useState(null);

    const getUserId = () => {
        axios.get('/quizes/' + props.quizeId + '/get_user_id')
            .then(response => {
                setUserId(response.data.user_id);
            })
            .catch(error => {
                console.log(error);
            });
    }

    useEffect(() => {
        getUserId();
    }, []);

    const getOtherUsersQuizeHandler = () => {
        props.history.push('/users/' + userId + '/quizes');
        console.log(props);
    }

    return (
        <div className={styles.QuizeResults}>
            <p>YOUR　SCORE WAS {props.score} / {props.quizeLength} </p>
            <p 
                onClick={() => getOtherUsersQuizeHandler()}
                className={styles.OtherQuizeLink}>
                    このユーザーが作成した他のクイズをみる
            </p>
        </div>
    );
};

export default QuizeResults;