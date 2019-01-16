import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Field, reduxForm, change} from 'redux-form'
import {withStyles} from '@material-ui/core/styles';
import {Card, CardContent, CardHeader, MenuItem} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { Select } from 'redux-form-material-ui';

// Import custom components
import renderText from '../common/form/renderText';
import {ROLE_ADMIN, ROLE_MANAGER, ROLE_REGULAR, ROLE_MAPPING} from "../../constants/roles";

const styles = theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    card: {
        padding: 20,
        overflow: 'auto'
    },
    cardHeader: {
        textAlign: 'center'
    },
    btnDiv: {
        textAlign: 'center'
    },
    btn: {
        marginTop: 20,
        marginLeft: 20
    }
});

class UserForm extends Component {
    componentDidMount() {
        const {user} = this.props;

        if (user) {
            this.props.dispatch(change('UserForm', 'first_name', user.first_name));
            this.props.dispatch(change('UserForm', 'last_name', user.last_name));
            this.props.dispatch(change('UserForm', 'email', user.email));
            this.props.dispatch(change('UserForm', 'calories_goal', user.calories_goal));
            this.props.dispatch(change('UserForm', 'role', user.role));
        }
    }

    render() {
        const {handleSubmit, onSubmit, classes, user, onCancel} = this.props;

        return (
            <div className={classes.root}>
                <Card className={classes.card}>
                    <CardHeader
                        className={classes.cardHeader}
                        title={user ? 'Update User' : 'Create User'}
                    />
                    <CardContent>
                        <form method="post" onSubmit={handleSubmit(onSubmit)}>
                            <Field
                                type="text"
                                name="first_name"
                                label="First Name"
                                component={renderText}
                            />
                            <br/>
                            <Field
                                type="text"
                                name="last_name"
                                label="Last Name"
                                component={renderText}
                            />
                            <br/>
                            <Field
                                type="text"
                                name="email"
                                label="Email"
                                component={renderText}
                            />
                            <br/>
                            <Field
                                type="text"
                                name="calories_goal"
                                label="Calories Goal"
                                component={renderText}
                            />
                            <br/>
                            <Field
                                name="role"
                                component={Select}
                                label="Role"
                                placeholder="Select a plan"
                            >

                                {[ROLE_ADMIN, ROLE_MANAGER, ROLE_REGULAR].map(option => (
                                    <MenuItem key={option} value={option}>{ROLE_MAPPING[option]}</MenuItem>
                                ))}
                            </Field>
                            <br/>
                            <Field
                                type="password"
                                name="password"
                                label="Password (leave empty to stay the same)"
                                component={renderText}
                            />
                            <br/>
                            <div className={classes.btnDiv}>
                                <Button className={classes.btn}
                                        type="submit"
                                        variant="raised"
                                        color="primary">
                                    Save
                                </Button>
                                <Button variant="contained"
                                        onClick={onCancel}
                                        className={classes.btn}>
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    </CardContent>

                </Card>
            </div>
        )
    }
}

const validateSignUp = values => {
    const errors = {};

    const requiredFields = [
        'first_name',
        'last_name',
        'email',
        'calories_goal',
        'role'
    ];
    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = '(The ' + field + ' field is required.)';
        }
    });

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = '(Invalid email address.)';
    }

    return errors
};

UserForm.propTypes = {
    user: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
};

export default reduxForm({
    form: 'UserForm', // a unique identifier for this form
    validate: validateSignUp // ←Callback function for client-side validation
})(withStyles(styles)(UserForm))