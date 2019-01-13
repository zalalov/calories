import React from 'react';
// Import routing components
import {Route, Switch} from 'react-router-dom';
import {ConnectedRouter} from 'react-router-redux';
import history from '../utils/history';
// Import custom components
import MainLayout from '../components/common/layout/layout';
import NotFound from '../components/error/NotFound';
import LoginForm from '../containers/auth/LoginContainer';
import SignUpForm from '../containers/auth/SignUpContainer';
import UserList from '../containers/entities/UserListContainer';
import UserForm from '../containers/entities/UserContainer';
import AuthenticatedRoute from './AuthenticatedRoute';
import AdminRoute from './AdminRoute';
import Logout from "../containers/auth/LogoutContainer";

const Router = () => (
    <ConnectedRouter history={history}>
        <Switch>
            <Route exact path="/" component={LoginForm}/>
            <Route path="/signup" component={SignUpForm}/>
            <Route path="/logout" component={Logout}/>

            <MainLayout>
                <UserRoutes/>
            </MainLayout>

            <Route component={NotFound}/>
        </Switch>
    </ConnectedRouter>
);

const UserRoutes = () => (
    <Switch>
        <AdminRoute path="/users/:userId/edit" component={UserForm}/>
        <AdminRoute path="/users" component={UserList}/>
    </Switch>
);

export default Router;
