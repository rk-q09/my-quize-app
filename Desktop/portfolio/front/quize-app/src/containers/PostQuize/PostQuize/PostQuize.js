import React, { useState } from 'react';
import axios from '../../../axios-base';

import styles from './PostQuize.module.css';

const PostQuize = props => {
    const [quizeTitle, setQuizeTitle] = useState("");
    const [errorMessages, setErrorMessages] = useState([]);

    const userId = localStorage.getItem('user_id');

    const quizeRegistrationHandler = event => {
        axios.post('/users/' + userId + '/quizes', {
            title: quizeTitle
        }).then(response => {
            if ( response.data.status === "created") {
                props.history.push( '/quizes/' + response.data.id + '/new' );
            } else {
                setErrorMessages(response.data.errors);
            }
        })
        .catch(error => {
            setErrorMessages([error.message]);
        });
        event.preventDefault();
    };

    const inputChangedHandler = event => {
        setQuizeTitle(event.target.value);
    }


    return (
       <div className={styles.PostQuize}>
           <p>ようこそQuizeAppへ</p>
           <p>作成したいクイズのタイトルを入力して下さい</p>
           {errorMessages.length > 0 ? (
                <div className={styles.ErrorMessages}>
                    <ul>
                        {errorMessages.map(error => (
                            <li key={error}>{error}</li>
                        ))}
                    </ul>
                </div>
            ) : null }
           <form onSubmit={quizeRegistrationHandler}>
               <div>
                    <input
                        type="text"
                        name="title"
                        placeholder="Quize title" 
                        value={quizeTitle}
                        className={styles.FormInput}
                        onChange={inputChangedHandler}
                        required
                    />
                </div>
                <button className={styles.FormButton}>Create Quize</button>
           </form>
       </div>
    );
};

export default PostQuize;