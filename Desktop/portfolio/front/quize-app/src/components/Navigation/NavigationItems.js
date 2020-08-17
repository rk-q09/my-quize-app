import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NavigationItems.module.css';

const NavigationItems = props => (
    <nav className={styles.NavigationItems}>
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            {props.isAuthenticated 
                ? (
                    <>
                        <li><Link to="/myquizes">MyQuizes</Link></li>
                        <li><Link to="/signout">SignOut</Link></li>
                    </>
                )
                : <li><Link to="/signin">SignIn</Link></li>
            }
        </ul>
    </nav>
);

export default NavigationItems;