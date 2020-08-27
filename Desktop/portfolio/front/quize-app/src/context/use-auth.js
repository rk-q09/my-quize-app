import React, { useState, useContext, createContext } from 'react';
import axios from '../axios-base';

const authContext = createContext();

export function ProvideAuth ({children})  {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export const useAuth = () => {
    return useContext(authContext);
};

const useProvideAuth = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [signInErrorMessages, setSignInErrorMessages] = useState('');
    const [signUpErrorMessages, setSignUpErrorMessages] = useState([]);

    const signUp = (userName, email, password, passwordConfirmation, history) => {
        axios.post('/registrations', {
            user: {
                user_name: userName,
                email: email,
                password: password,
                password_confirmation: passwordConfirmation
            }
        },
        { withCredentials: true })
            .then(response => {
                if ( response.data.status === "created" ) {
                    history.push('/');
                } else {
                    setSignUpErrorMessages(response.data.errors);
                }
            })
            .catch(error => {
                setSignUpErrorMessages([error.message]);
            });
    }

    const checkLoggedIn = () => {
        axios.get('/logged_in', { withCredentials: true} )
            .then(response => {
                if ( response.data.logged_in ) {
                    setIsLoggedIn(true);
                } else if ( !response.data.logged_in) {
                    setIsLoggedIn(false);
                };
            })
    };

    const signIn = (email, password, history) => {
        axios.post('/sessions', {
            user: {
                email: email,
                password: password
            }
        }, 
        { withCredentials: true })
            .then(response => {
                if ( response.data.status === "created" ) {
                    localStorage.setItem('user_id', response.data.user.id)
                    checkLoggedIn();
                    history.push('/');
                } else {
                    setSignInErrorMessages(response.data.errors);
                }               
            })
            .catch(error => {
                setSignInErrorMessages([error.message]);
            });
    };

    const signOut = () => {
        axios.delete('/logout', { withCredentials: true})
            .then(response => {
                console.log("sign out");
                localStorage.removeItem('user_id');
                checkLoggedIn();
            })
    };

    return {
        signUp,
        signIn,
        signOut,
        checkLoggedIn,
        isLoggedIn,
        signUpErrorMessages,
        signInErrorMessages
    };
};