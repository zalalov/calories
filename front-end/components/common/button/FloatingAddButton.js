import React from 'react';
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const styles = theme => ({
    fab: {
        margin: theme.spacing.unit,
        top: 'auto',
        right: 20,
        bottom: 20,
        left: 'auto',
        position: 'fixed',
    },
    extendedIcon: {
        marginRight: theme.spacing.unit,
    },
});

function FloatingAddButton(props) {
    const {classes, link} = props;
    return (
        <Link to={link}>
            <Fab color="primary" aria-label="Add" className={classes.fab}>
                <AddIcon/>
            </Fab>
        </Link>
    );
}

FloatingAddButton.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FloatingAddButton);
