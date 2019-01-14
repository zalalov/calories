import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

const renderText = (props) => {
    return (
        <TextField
            type={props.type}
            label={props.label}
            error={props.meta.touched && props.meta.invalid}
            helperText={props.touched && props.meta.error}
            margin="normal"
            fullWidth={true}
            {...props.input}
        />
    );
};

renderText.propTypes = {
    input: PropTypes.object.isRequired,
    label: PropTypes.string.isRequired,
    meta: PropTypes.object,
    value: PropTypes.string
};

export default renderText;