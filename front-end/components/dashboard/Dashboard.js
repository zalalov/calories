import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';

import Product from './Product';

const data = {
    recentProducts: [
        {id: 1, title: 'Samsung TV', text: 'Samsung 32 1080p 60Hz LED Smart HDTV.'},
        {id: 2, title: 'Playstation 4', text: 'PlayStation 3 500 GB System'},
        {id: 3, title: 'Apple iPhone 6', text: 'Apple iPhone 6 Plus 16GB Factory Unlocked GSM 4G '},
        {id: 4, title: 'Apple MacBook', text: 'Apple MacBook Pro MD101LL/A 13.3-Inch Laptop'}
    ]
};


const Dashboard = props => {
    return (
        <div>
             <Grid container spacing={24}>
               <Grid item xs>
                    <Product data={data.recentProducts}/>
                </Grid>
            </Grid>
        </div>
    )
};

Dashboard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default Dashboard