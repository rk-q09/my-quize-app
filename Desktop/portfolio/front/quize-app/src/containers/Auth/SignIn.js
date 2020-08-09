import React, { useState } from 'react';
import { useAuth } from '../../context/use-auth';

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
        <div>
            <form onSubmit={userLoginHandler}>
                <input 
                    type="email" 
                    name="email" 
                    placeholder="Email" 
                    value={userSignInInfo.email} 
                    onChange={inputChangedHandler} 
                    required 
                />
                <input 
                    type="password" 
                    name="password" 
                    placeholder="Password" 
                    value={userSignInInfo.password} 
                    onChange={inputChangedHandler} 
                    required 
                />
                <button>Login</button>
            </form>
        </div>
    );
};

export default SignIn;