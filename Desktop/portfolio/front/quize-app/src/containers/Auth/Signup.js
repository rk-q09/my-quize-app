import React, { useState } from 'react';
import { useAuth } from '../../context/use-auth'

import styles from './SignIn.module.css';

const Signup = props => { 
    const [userInfo, setUserInfo] = useState({
        user_name: "",
        email: "",
        password: "",
        password_confirmation: ""
    });

    const auth = useAuth();

    const userRegistrationHandler = event => {
        auth.signUp(
            userInfo.user_name,
            userInfo.email,
            userInfo.password,
            userInfo.password_confirmation,
            props.history
        );
        event.preventDefault();
    };

    const inputChangedHandler = event => {
       setUserInfo({
           ...userInfo,
           [event.target.name]: event.target.value
       });
    };

    return (
        <div className={styles.SignIn}>
            {auth.signUpErrorMessages.length > 0 ? (
                <div className={styles.ErrorMessages}>
                    <ul>
                        {auth.signUpErrorMessages.map(error => (
                            <li key={error}>{error}</li>
                        ))}
                    </ul>
                </div>
            ) : null }
            <form onSubmit={userRegistrationHandler}>
                <div>
                    <input 
                        type="name" 
                        name="user_name" 
                        placeholder="User name" 
                        value={userInfo.user_name}
                        className={styles.FormInput} 
                        onChange={inputChangedHandler} 
                        required 
                    />
                </div>
                <div>
                    <input 
                        type="email" 
                        name="email" 
                        placeholder="Email" 
                        value={userInfo.email} 
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
                        value={userInfo.password}
                        className={styles.FormInput}  
                        onChange={inputChangedHandler} 
                        required 
                    />
                </div>
                <div>
                  <input 
                    type="password" 
                    name="password_confirmation" 
                    placeholder="Password confirmation" 
                    value={userInfo.password_confirmation} 
                    className={styles.FormInput}  
                    onChange={inputChangedHandler} 
                    required 
                  />
                </div>
                <button className={styles.FormButton}>Sign Up</button>
            </form>
        </div>
    );
};

export default Signup;