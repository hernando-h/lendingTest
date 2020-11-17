/**
 * Main module.
 * @author hernando.shaolin@gmail.com
 * @version 2020-11-16
 */
import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid, Typography } from '@material-ui/core';

import LoanModule from './Loan';
import InvestmentModule from './Investment';

const useStyles = makeStyles({
    mainContainer: {
        minHeight: "70vh",
        padding: 0,
        backgroundColor: "#f4f4f4",
        color: "white",
        boxShadow: "0px 3px 3px 0px rgba(0, 0, 0, 0.3)"
    },
});

export default function AppContainer() {
    const classes = useStyles();
    return (
        <Container style={{ paddingTop: "70px" }}>

            {/* window title */}
            <Container disableGutters={true} maxWidth="md">
                <Typography variant="h4" style={{ marginBottom: "10px", color: "white" }}>Advance for syndication</Typography>
            </Container>

            {/* contents */}
            <Container disableGutter={true} maxWidth="md" className={classes.mainContainer} style={{ overflow: 'hidden' }} >
                <Grid container direction='row' justify="space-between" spacing={0}  >

                    <Grid item xs={4}>
                        <LoanModule></LoanModule>
                    </Grid>

                    <Grid item xs={8} style={{ zIndex: 99, boxShadow: "-3px 0px 5px 2px rgba(0, 0, 0, 0.2)" }}>
                        <InvestmentModule></InvestmentModule>
                    </Grid>
                </Grid>
            </Container>

        </Container>
    );
}