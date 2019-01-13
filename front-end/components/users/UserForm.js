import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {Field, reduxForm} from 'redux-form'
import {withStyles} from '@material-ui/core/styles';
import {Card, CardHeader, CardContent} from '@material-ui/core';
import Button from '@material-ui/core/Button';

// Import custom components
import renderText from '../common/form/renderText';

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

const UserForm = props => {
    const {handleSubmit, onSubmit, classes, user, onCancel} = props;

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
                            component={renderText}
                            label="First Name"
                            value={user.first_name}
                        />
                        <br />
                        <Field
                            type="text"
                            name="last_name"
                            component={renderText}
                            label="Last Name"
                            value={user.last_name}
                        />
                        <br />
                        <Field
                            type="text"
                            name="email"
                            component={renderText}
                            label="Email"
                            value={user.email}
                        />
                        <br />
                        <Field
                            type="password"
                            name="password"
                            component={renderText}
                            label="Password"
                        />
                        <br />
                        <Field
                            type="password"
                            name="confirmation"
                            component={renderText}
                            label="Confirmation"
                        />
                        <br />
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
};

const validateSignUp = values => {
    const errors = {};

    const requiredFields = [
        'first_name',
        'last_name',
        'email',
        'password',
        'confirmation'
    ];
    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = '(The ' + field + ' field is required.)';
        }
    });

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = '(Invalid email address.)';
    }

    if (values.password !== values.confirm) {
        errors.password = errors.confirm = 'Password and Confirmation should match.';
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