import React from 'react';
import {Route, Redirect} from 'react-router-dom';

import {getToken} from '../utils/storageUtil'
import {connect} from "react-redux";

const isAuthenticated = () => {
    return !!getToken();
};

const AuthenticatedRoute = (props) => {
    let {component: Component, role, ...rest} = props;

    return (
        <Route {...rest} render={props => (
            isAuthenticated() ? (
                <Component {...props}/>
            ) : (
                <Redirect to={{
                    pathname: '/',
                    state: {from: props.location}
                }}/>
            )
        )}/>
    );
};

/**
 * Map the state to props.
 */
const mapStateToProps = state => ({
    role: state.auth,
});

export default connect(mapStateToProps, null)(AuthenticatedRoute)