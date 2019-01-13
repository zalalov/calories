import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as crudAction from '../../actions/crudAction';
import history from '../../utils/history';

// Import custom components
import UserForm from '../../components/users/UserForm';
import {USERS} from "../../constants/entity";

class UserContainer extends Component {
    constructor(props) {
        super(props);
    }

    submitForm(formProps) {
        this.props.actions.submitForm(USERS, formProps, this.props.match.params.userId);
    }

    cancelForm() {
        history.goBack();
    }

    render() {
        let user = this.props.users.find(user => {
            return user.id === parseInt(this.props.match.params.userId)
        });

        return (
            <UserForm user={user} onSubmit={this.submitForm} onCancel={this.cancelForm}/>
        )
    }
}

/**
 * Map the state to props.
 */
const mapStateToProps = state => ({
    users: state.entities.users.data
});

/**
 * Map the actions to props.
 */
const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Object.assign({}, crudAction), dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(UserContainer)