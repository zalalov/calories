import React from 'react';
import {connect} from 'react-redux';
// Import routing components
import {Route, Redirect, Switch} from 'react-router-dom';
import {ConnectedRouter} from 'react-router-redux';
import history from '../utils/history';
// Import custom components
import MainLayout from '../components/common/layout/layout';
import NotFound from '../components/error/NotFound';
import LoginForm from '../containers/auth/LoginContainer';
import SignUpForm from '../containers/auth/SignUpContainer';
import UserList from '../containers/entities/UserListContainer';
import UserForm from '../containers/entities/UserContainer';
import AdminRoute from './AdminRoute';
import AuthenticatedRoute from './AuthenticatedRoute';
import Logout from "../containers/auth/LogoutContainer";
import MealForm from "../containers/entities/MealContainer";
import MealList from "../containers/entities/MealListContainer";
import SettingsForm from "../containers/entities/SettingsContainer";

const Router = (props) => (
    <ConnectedRouter history={history}>
        <Switch>
            <Route exact path="/" component={LoginForm}/>
            <Route path="/signup" component={SignUpForm}/>
            <Route path="/logout" component={Logout}/>

            <MainLayout auth={props.auth}>
                <Switch>
                    <AuthenticatedRoute path="/settings" component={SettingsForm}/>
                    <AuthenticatedRoute path="/users/:userId/meals/:mealId/edit" component={MealForm}/>
                    <AdminRoute path="/users/:userId/meals/new" component={MealForm}/>
                    <AuthenticatedRoute path="/users/:userId/meals" component={MealList}/>
                    <AdminRoute path="/users/:userId/edit" component={UserForm}/>
                    <AdminRoute path="/users/new" component={UserForm}/>
                    <AuthenticatedRoute path="/users" component={UserList}/>

                    <Redirect from="/meals" to={`/users/${props.auth.id}/meals`} />
                </Switch>
            </MainLayout>

            <Route component={NotFound}/>
        </Switch>
    </ConnectedRouter>
);

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, null)(Router);
