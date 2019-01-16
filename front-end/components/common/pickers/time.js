import 'date-fns';
import React from 'react';
import PropTypes from 'prop-types';
import DateFnsUtils from '@date-io/date-fns';
import {TimePicker, MuiPickersUtilsProvider} from 'material-ui-pickers';


class MUITimePicker extends React.Component {
    render() {
        const {label, value, onChange} = this.props;

        return (
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <TimePicker
                    margin="normal"
                    label={label}
                    value={value}
                    onChange={onChange}
                />
            </MuiPickersUtilsProvider>
        );
    }
}

MUITimePicker.propTypes = {
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.instanceOf(Date).isRequired
};

export default MUITimePicker;