import React from 'react';
import { useAuth } from '../../context/use-auth';
import { Link } from 'react-router-dom';

import PostQuize from '../PostQuize/PostQuize/PostQuize';
import styles from './HomeContent.module.css';

const HomeContent = props => {
    const auth = useAuth();

    return !auth.isLoggedIn ? (
        <div className={styles.HomeContent}>
            <p>クイズを作成するにはログインして下さい.</p>
            <Link to="/signin">SignIn</Link>
        </div>
    )
    :(
        <div className={styles.HomeContent}>
              <PostQuize history={props.history}/>
        </div>
    );
};

export default HomeContent;