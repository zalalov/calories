import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as crudAction from '../../actions/crudAction';
import history from '../../utils/history';

// Import custom components
import SettingsForm from '../../components/settings/SettingsForm';
import {SETTINGS} from "../../constants/entity";

class MealContainer extends Component {
    constructor(props) {
        super(props);

        this.submitForm = this.submitForm.bind(this);
    }

    submitForm(formProps) {
        this.props.actions.submitForm(SETTINGS, formProps);
    }

    cancelForm() {
        history.goBack();
    }

    render() {
        const {user} = this.props;

        return (
            <SettingsForm user={user} onSubmit={this.submitForm} onCancel={this.cancelForm}/>
        );
    }
}

/**
 * Map the state to props.
 */
const mapStateToProps = state => ({
    user: state.auth
});

/**
 * Map the actions to props.
 */
const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Object.assign({}, crudAction), dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(MealContainer)