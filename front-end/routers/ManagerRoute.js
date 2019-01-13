import React from 'react';
import {Route, Redirect} from 'react-router-dom';

import {connect} from "react-redux";
import {ROLE_MANAGER} from "../constants/roles";


const ManagerRoute = (props) => {
    let {component: Component, role, ...rest} = props;
    const isManager = role === ROLE_MANAGER;

    return (
        <Route {...rest} render={props => (
            isManager ? (
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
    role: state.auth.role,
});

export default connect(mapStateToProps, null)(ManagerRoute)