import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';

// Import custom components
import PersistentDrawerLeft from '../drawer/drawer';

const styles = theme => ({
    root: {
        width: '100%',
        height: 'auto',
        zIndex: 1,
        overflow: 'hidden',
    },
    appFrame: {
        position: 'relative',
        display: 'flex',
        width: '100%',
        height: '100%',
    },
    content: {
        width: '100%',
        flexGrow: 1,
        padding: 24,
        height: 'calc(100% - 56px)',
        marginTop: 56,
        [theme.breakpoints.up('sm')]: {
            height: 'calc(100% - 64px)',
            marginTop: 64,
        },
    }
});

class MainLayout extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const classes = this.props.classes;

        console.log(this.props.children);

        return (
            <div className={classes.root}>
                <div className={classes.appFrame}>
                    <PersistentDrawerLeft auth={this.props.auth}/>
                    <main className={classes.content}>
                        {this.props.children}
                    </main>
                </div>
            </div>
        )
    }
}

MainLayout.propTypes = {
    classes: PropTypes.object.isRequired,
    // children: PropTypes.element,
    auth: PropTypes.object.isRequired
};

export default withStyles(styles)(MainLayout)