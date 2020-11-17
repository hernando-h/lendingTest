/**
 * Module that expose the loan information.
 * @author hernando.shaolin@gmail.com
 * @version 2020-11-17
 */

import React from 'react';

import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';
import { Box, Container, Fab, Grid, Paper, SvgIcon, Typography } from '@material-ui/core';

import { AppContext } from '../state/AppState';

/** Main container and public class. */
class RawLoanInformation extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return <Box>
            <div id='helper' style={{ padding: "5px 10px", fontSize: '10pt', color: '#00a3ad' }}> Select a product to syndicate </div>

            <LoanContent classes={this.props.classes} ></LoanContent>

            <Grid id='actionGrid' container alignItems="center" justify="space-around"
                style={{ marginTop: '1em' }}>
                
                {/* Svg is the icons into buttons (Close and Sell) */}
                <Fab variant="extended" className={this.props.classes.button} >
                    <SvgIcon>
                        <path d="M16.192 6.344L11.949 10.586 7.707 6.344 6.293 7.758 10.535 12 6.293 16.242 7.707 17.656 11.949 13.414 16.192 17.656 17.606 16.242 13.364 12 17.606 7.758z"></path>
                    </SvgIcon>
                    Close</Fab>
                <Fab variant="extended" className={this.props.classes.button} >
                    <SvgIcon>
                        <path d="M42.462-340.524H32.991a.962.962,0,0,1-.7-.3,1.057,1.057,0,0,1-.29-.734v-9.924a1.056,1.056,0,0,1,.29-.734.962.962,0,0,1,.7-.3H37.4l6.056,3.771v7.192a1.057,1.057,0,0,1-.29.734A.962.962,0,0,1,42.462-340.524Zm-4.7-6.292a1.4,1.4,0,0,0-1.362,1.427,1.4,1.4,0,0,0,1.362,1.427,1.4,1.4,0,0,0,1.362-1.427A1.4,1.4,0,0,0,37.757-346.816Zm-4.89-4.086v2.011h5.695V-350.9Z" transform="translate(-25.513 358.699)" />
                    </SvgIcon>
                    Sell
                </Fab>
            </Grid>
        </Box>
    }
}

/** That function passing styles in props. */
const LoanInformation = withStyles((theme) => ({
    button: {
        width: "40%",
        boxShadow: "none",
        maxHeight: "25px",
        backgroundColor: '#00a3ad',
        color: 'white',
        textTransform: 'none',

        '&:hover': {
            backgroundColor: 'white',
            color: '#00a3ad',
            boxShadow: "0px 3px 3px 0px rgba(0, 0, 0, 0.3)",
        },
        '&:focus': {
            backgroundColor: 'white',
            color: '#00a3ad',
            boxShadow: "0px 3px 3px 0px rgba(0, 0, 0, 0.3)",
        },
    },
    loanStyle: {
        backgroundColor: 'snow',
        textTransform: 'none',
        '&:hover': { backgroundColor: '#f4f4f4' },
    },
    loanContent: {
        height: "57vh",
        zIndex: 3,
        boxShadow: "0px 3px 5px 2px rgba(0, 0, 0, 0.1)",
        overflowY: 'auto',
        scrollBehavior: 'smooth'
    },
}))(RawLoanInformation);
export default LoanInformation;


/** List of Loans container. */
class LoanContent extends React.Component {

    static contextType = AppContext;
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        /** Get all loans from backend when start Application. */
        this.context.getLoans();
    }

    render() {
        return <Paper square className={this.props.classes.loanContent} >
            {this.context.loans && this.context.loans.map((loan) => (
                <LoanItem key={loan.id} className={this.props.classes.loanStyle} data={loan} isSelected={this.context.selectedLoan ? this.context.selectedLoan.id == loan.id : false}></LoanItem>
            ))}
        </Paper>
    }

}

class LoanItem extends React.Component {

    static contextType = AppContext;
    constructor(props) {
        super(props);
    }

    handleClick(e) {
        e.preventDefault();
        this.context.getInvestments(this.props.data);
    }

    render() {
        return <Paper square elevation={0} onClick={this.handleClick.bind(this)} style={{ textTransform: 'none', backgroundColor: this.props.isSelected ? '#00a3ad' : 'snow', textTransform: 'none', padding: '10px' }} fullWidth className={this.props.classes}>

            <Container style={{ margin: '10px 0' }}>
                <Grid container direction='column'>

                    <Grid item container direction='row' justify="space-between" >
                        <Typography variant='caption' style={{ color: this.props.isSelected ? 'white' : 'gray' }}>Product ID: </Typography>
                        <Typography variant='caption' style={{ color: this.props.isSelected ? 'white' : '#00a3ad' }}>Advance</Typography>
                    </Grid>
                    <Grid item container direction='row' justify="space-between" >
                        <Typography style={{ color: this.props.isSelected ? 'white' : 'black' }} variant='caption'><b>{this.props.data.id}</b></Typography>
                        <Typography style={{ color: this.props.isSelected ? 'white' : 'black' }} variant='caption'>{
                            moment(this.props.data.advance_date).format("DD/MM/Y")
                        }</Typography>
                    </Grid>
                    <Grid item container direction='row' justify="flex-end" >
                        <Typography style={{ color: this.props.isSelected ? 'white' : 'black' }} variant='subtitle1'><b>{this.props.data.formated_amount}</b></Typography>
                    </Grid>

                </Grid>
            </Container>
        </Paper>
    }
}