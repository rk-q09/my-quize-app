import React, { useState } from 'react';
import axios from '../../../axios-base';

import styles from './PostQuize.module.css';

const PostQuize = props => {
    const [quizeTitle, setQuizeTitle] = useState("");

    const userId = localStorage.getItem('user_id');

    const quizeRegistrationHandler = event => {
        axios.post('/users/' + userId + '/quizes', {
            title: quizeTitle
        }).then(response => {
            console.log(response);
            props.history.push( '/quizes/' + response.data.id + '/new' );
        }).catch(error => {
            console.log(error);
        });
        event.preventDefault();
    };

    const inputChangedHandler = event => {
        setQuizeTitle(event.target.value);
    }


    return (
       <div className={styles.PostQuize}>
           <p>作成したいクイズのタイトルを入力して下さい</p>
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