import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/use-auth';

import styles from './SignIn.module.css';

const SignIn = props => { 
    const [userSignInInfo, setUserSignInInfo] = useState({
        email: "",
        password: "",
    });

    const auth = useAuth();

    const userLoginHandler = event => {
        auth.signIn(
            userSignInInfo.email,
            userSignInInfo.password
        );
        event.preventDefault();
        props.history.push('/');
    };

    const inputChangedHandler = event => {
       setUserSignInInfo({
           ...userSignInInfo,
           [event.target.name]: event.target.value
       });
    };

    return (
        <div className={styles.SignIn}>
            <form onSubmit={userLoginHandler}>
                <div>
                    <input 
                        type="email" 
                        name="email" 
                        placeholder="Email" 
                        value={userSignInInfo.email} 
                        className={styles.FormInput}
                        onChange={inputChangedHandler} 
                        required 
                    />
                </div>
                <div>
                    <input 
                        type="password" 
                        name="password" 
                        placeholder="Password" 
                        value={userSignInInfo.password} 
                        className={styles.FormInput}
                        onChange={inputChangedHandler} 
                        required 
                    />
                </div>
                <button className={styles.FormButton}>Login</button>
                <p>アカウントをお持ちでないですか...？ <Link to='/signup'>Sign Up</Link></p>
            </form>
        </div>
    );
};

export default SignIn;