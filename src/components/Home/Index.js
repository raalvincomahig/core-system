import React from 'react';
import { 
    Grid
}  from "@material-ui/core";
import Navigation from './Navigation/Index'
import Homepage from './Homepage'

export default function Home(props) {
    const { user, classes } = props;
    return (
        <Grid container spacing={1}>
            <Grid item xs={3}>
                <Navigation classes={classes} user={user} />
            </Grid>
            <Grid item xs={9}>
                <Homepage classes={classes} />
            </Grid>
        </Grid>
    );
}
