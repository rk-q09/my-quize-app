import React, { useState } from 'react';
import { useAuth } from '../../context/use-auth'

const Signup = () => { 
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
            userInfo.password_confirmation
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
        <div>
            <form onSubmit={userRegistrationHandler}>
                <input 
                    type="name" 
                    name="user_name" 
                    placeholder="User name" 
                    value={userInfo.user_name} 
                    onChange={inputChangedHandler} 
                    required 
                />
                <input 
                    type="email" 
                    name="email" 
                    placeholder="Email" 
                    value={userInfo.email} 
                    onChange={inputChangedHandler} 
                    required 
                />
                <input 
                    type="password" 
                    name="password" 
                    placeholder="Password" 
                    value={userInfo.password} 
                    onChange={inputChangedHandler} 
                    required 
                />
                  <input 
                    type="password" 
                    name="password_confirmation" 
                    placeholder="Password confirmation" 
                    value={userInfo.password_confirmation} 
                    onChange={inputChangedHandler} 
                    required 
                />
                <button>Register</button>
            </form>
        </div>
    );
};

export default Signup;