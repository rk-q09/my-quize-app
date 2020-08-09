import React from 'react';
import { Link } from 'react-router-dom';

const NavigationItems = props => (
    <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        {props.isAuthenticated 
            ? (
                <>
                    <li><Link to="/quizes">MyQuizes</Link></li>
                    <li><Link to="/signout">SignOut</Link></li>
                </>
            )
            : <li><Link to="/signin">SignIn</Link></li>
        }
    </ul>
);

export default NavigationItems;