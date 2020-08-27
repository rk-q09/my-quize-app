import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useAuth } from '../../context/use-auth';

const SignOut = props => {
    const auth = useAuth();
    
    useEffect(() => {
        auth.signOut();
    }, [auth]);

    return <Redirect to="/" />;
};

export default SignOut;