import React, { useState } from 'react';
import axios from '../../axios-base';

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
       <div>
           <form onSubmit={quizeRegistrationHandler}>
               <input
                   type="text"
                   name="title"
                   placeholder="Quize title" 
                   value={quizeTitle}
                   onChange={inputChangedHandler}
                   required
                />
                <button>Start Create Quize</button>
           </form>
       </div>
    );
};

export default PostQuize;