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
    const [errorMessages, setErrorMessages] = useState([]);

    const signUp = (userName, email, password, passwordConfirmation) => {
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
                if ( response.data.status === "created") {
                    console.log("registration res", response.data);
                } else {
                    console.log("registration res", response.data.errors);
                    setErrorMessages(response.data.errors);
                }
            })
    }

    const checkLoggedIn = () => {
        axios.get('/logged_in', { withCredentials: true} )
            .then(response => {
                console.log("logged in?", response);
                if ( response.data.logged_in ) {
                    setIsLoggedIn(true);
                } else if ( !response.data.logged_in) {
                    setIsLoggedIn(false);
                };
            })
            .catch(error => {
                console.log("check login error", error.response.data.errors);
            });
    };

    const signIn = (email, password) => {
        axios.post('/sessions', {
            user: {
                email: email,
                password: password
            }
        }, 
        { withCredentials: true })
            .then(response => {
                console.log("your user id is", response.data.user.id);
                localStorage.setItem('user_id', response.data.user.id)
                checkLoggedIn();
            })
            .catch(error => {
                console.log("login error", error);
            });
    };

    const signOut = () => {
        axios.delete('/logout', { withCredentials: true})
            .then(response => {
                console.log("sign out");
                localStorage.removeItem('user_id');
                checkLoggedIn();
            })
            .catch(error => {
                console.log("logout error", error);
            });
    };

    return {
        signUp,
        signIn,
        signOut,
        checkLoggedIn,
        isLoggedIn,
        errorMessages
    };
};