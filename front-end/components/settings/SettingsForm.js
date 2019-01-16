import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Field, reduxForm, change} from 'redux-form'
import {withStyles} from '@material-ui/core/styles';
import {Card, CardContent, CardHeader} from '@material-ui/core';
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

class SettingsForm extends Component {
    componentDidMount() {
        const {user} = this.props;

        this.props.dispatch(change('SettingsForm', 'calories_goal', user.calories_goal));
    }

    render() {
        const {handleSubmit, onSubmit, classes, onCancel} = this.props;

        return (
            <div className={classes.root}>
                <Card className={classes.card}>
                    <CardHeader
                        className={classes.cardHeader}
                        title={'User Settings'}
                    />
                    <CardContent>
                        <form method="post" onSubmit={handleSubmit(onSubmit)}>
                            <Field
                                type="text"
                                name="calories_goal"
                                label="Calories Goal"
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


    if (!values['calories_goal']) {
        errors['calories_goal'] = '(The calories_goal field is required.)';
    }

    if (parseInt(values['calories_goal']) === values['calories_goal']) {
        errors['calories_goal'] = 'Invalid calories_goal value';
    }

    return errors
};

SettingsForm.propTypes = {
    user: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
};

export default reduxForm({
    form: 'SettingsForm', // a unique identifier for this form
    validate: validateSignUp // ←Callback function for client-side validation
})(withStyles(styles)(SettingsForm))