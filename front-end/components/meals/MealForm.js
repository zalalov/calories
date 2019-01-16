import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {change, Field, reduxForm} from 'redux-form'
import {withStyles} from '@material-ui/core/styles';
import {Card, CardContent, CardHeader} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import renderText from "../common/form/renderText";
// Import custom components

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

class MealForm extends Component {
    componentDidMount() {
        const {meal} = this.props;

        if (meal) {
            this.props.dispatch(change('MealForm', 'text', meal.text));
            this.props.dispatch(change('MealForm', 'calories', meal.calories));
            this.props.dispatch(change('MealForm', 'eaten_at', meal.eaten_at));
        }
    }

    render() {
        const {handleSubmit, onSubmit, classes, meal, onCancel} = this.props;

        return (
            <div className={classes.root}>
                <Card className={classes.card}>
                    <CardHeader
                        className={classes.cardHeader}
                        title={meal ? 'Update Meal' : 'Create Meal'}
                    />
                    <CardContent>
                        <form method="post" onSubmit={handleSubmit(onSubmit)}>
                            <Field
                                type="text"
                                name="text"
                                label="Text"
                                component={renderText}
                            />
                            <br/>
                            <Field
                                type="text"
                                name="calories"
                                component={renderText}
                                label="Calories"
                            />
                            <br/>
                            <Field
                                type="datetime"
                                name="eaten_at"
                                label="Eaten At"
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
        );
    }
}

const validateSignUp = values => {
    const errors = {};

    const requiredFields = [
        'text',
        'calories',
        'eaten_at',
    ];
    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = '(The ' + field + ' field is required.)';
        }
    });

    return errors
};

MealForm.propTypes = {
    meal: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
};

export default reduxForm({
    form: 'MealForm', // a unique identifier for this form
    validate: validateSignUp, // ←Callback function for client-side validation
})(withStyles(styles)(MealForm))