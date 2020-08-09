import React from 'react';
import { useAuth } from '../../context/use-auth';
import PostQuize from '../PostQuize/PostQuize';

const HomeContent = props => {
    const auth = useAuth();

    let homeContent = <p>hi</p>;

    if ( auth.isLoggedIn ) {
        homeContent = <PostQuize history={props.history}/>
    };

    return (
        <>
        {homeContent}
        </>
    );
};

export default HomeContent;