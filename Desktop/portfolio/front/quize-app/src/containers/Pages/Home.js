import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useAuth } from '../../context/use-auth';

import styles from './Home.module.css';
import About from './About';
import HomeContent from './HomeContent';
import Signup from '../Auth/Signup';
import SignIn from '../Auth/SignIn';
import SignOut from '../Auth/SignOut';
import QuizeList from '../GetQuize/QuizeList/QuizeList';
import FullQuestion from '../GetQuize/FullQuestion/FullQuestion';
import NavigationItems from '../../components/Navigation/NavigationItems';
import PostQuestion from '../PostQuize/PostQuestion/PostQuestion';
import PostChoices from '../PostQuize/PostChoices/PostChoices';
import OtherUsersQuizeList from '../GetQuize/OtherUsersQuizeList/OtherUsersQuizeList';

const Home = () => {
    const auth = useAuth();

    useEffect(() => {
        auth.checkLoggedIn();
    }, [auth]);

    const routes = (
        <Switch>
            <Route exact path='/' component={HomeContent} /> 
            <Route exact path='/myquizes' component={QuizeList} /> 
            <Route exact path='/quizes/:id'  component={FullQuestion} />
            <Route exact path='/users/:id/quizes' component={OtherUsersQuizeList}/ >
            <Route path='/quizes/:id/new' component={PostQuestion} />
            <Route path='/questions/:id/new' component={PostChoices} />
            <Route path="/about" component={About} />
            <Route path="/signup" component={Signup} />
            <Route path="/signin" component={SignIn} />
            <Route path="/signout" component={SignOut} />
        </Switch>
       
    );

    return (
        <div className={styles.Home}>
            <header>
                <nav>
                    <NavigationItems isAuthenticated={auth.isLoggedIn} />
                </nav>
            </header>
           {routes}
        </div>
    );
}

export default Home;