import React from 'react';

import moment from 'moment';
import { createMuiTheme, makeStyles, withStyles } from '@material-ui/core/styles';
import { Box, Button, Card, CardContent, CircularProgress, Container, DataGrid, Fab, Grid, GridList, LinearProgress, Paper, SvgIcon, Typography } from '@material-ui/core';

import { AppContext } from '../../state/AppState';

const theme = createMuiTheme();
const useStyles = makeStyles({
    mainContainer: { minHeight: "70vh", padding: 0, backgroundColor: "#f4f4f4", color: "white", boxShadow: "0px 3px 3px 0px rgba(0, 0, 0, 0.3)" },
    loanList: { height: "57vh", zIndex: 3, boxShadow: "0px 3px 5px 2px rgba(0, 0, 0, 0.1)", overflowY: 'auto', scrollBehavior: 'smooth' },
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

    fabButton:{
        position:'absolute',
        top:'14vh',
        right: ((window.innerWidth - theme.breakpoints.values.md) / 2) + 28,
        backgroundColor: '#ffad00',
        color: 'white',

    },

    loanStyle: {
        backgroundColor: 'snow',
        textTransform: 'none',
        '&:hover': { backgroundColor: '#f4f4f4' },
    },
    fixedHeader: {
        zIndex: 0, backgroundColor: '#00cfc9', height: '69px', padding: '10px 0 0 10px',
        fontSize: '10pt', fontWeight: 'bold'
    },
    investmentContent: {
        overflowY: 'auto', scrollBehavior: 'smooth'
    },
    linear: {
        backgroundColor: '#80d1d6',

        '& > * ': {
            backgroundColor: 'white',
        }
    }

});

const BorderLinearProgress = withStyles((theme) => ({
    root: {
        borderRadius: 5,
    },
    colorPrimary: {
        backgroundColor: '#80d1d6',

    },
    bar: {
        borderRadius: 5,
        backgroundColor: 'white',
    },
}))(LinearProgress);

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
                        <LeftContainer classes={classes}></LeftContainer>
                    </Grid>

                    <Grid item xs={8} style={{ zIndex: 99, boxShadow: "-3px 0px 5px 2px rgba(0, 0, 0, 0.2)" }}>
                        <InvestmentInformation classes={classes} />
                    </Grid>
                </Grid>
            </Container>

        </Container>
    );
}


class LeftContainer extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return <Box>
            <div id='helper' style={{ padding: "5px 10px", fontSize: '10pt', color: '#00a3ad' }}> Select a product to syndicate </div>

            <LoanList classes={this.props.classes} ></LoanList>

            <Grid id='actionGrid' container alignItems="center" justify="space-around"
                style={{ marginTop: '1em' }}>
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

class LoanList extends React.Component {

    static contextType = AppContext;
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.context.getLoans();
    }

    render() {
        return <Paper square className={this.props.classes.loanList} >
            {this.context.loans && this.context.loans.map((loan) => (
                <Loan key={loan.id} className={this.props.classes.loanStyle} data={loan} isSelected={this.context.selectedLoan ? this.context.selectedLoan.id == loan.id : false}></Loan>
            ))}
        </Paper>
    }

}

class Loan extends React.Component {

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

/** Contains of a loan's investments */
class InvestmentInformation extends React.Component {

    static contextType = AppContext;
    constructor(props) {
        super(props);
    }

    render() {
        return <Container disableGutters justify="space-between" style={{ minHeight: '70vh', width: '100%' }}>
            <div className={this.props.classes.fixedHeader} >Product ID: {this.context.selectedLoan ? this.context.selectedLoan.id : ''}
                <hr style={{ margin: '5px 0', opacity: '0.5', width: '35%', border: '1px solid white' }} />
            </div>
            <Fab  className={this.props.classes.fabButton} >
                <SvgIcon>
                    <path d="M19 11L13 11 13 5 11 5 11 11 5 11 5 13 11 13 11 19 13 19 13 13 19 13z"></path>
                </SvgIcon>
            </Fab>
            <Container disableGutters style={{ marginTop: '-35px', height: '55.5vh' }}>
                <InvestmentContent></InvestmentContent>
                <InvestmentRemain data={this.context.currentRemain} classes={this.props.classes}></InvestmentRemain>
            </Container>
        </Container >
    }

}



class InvestmentContent extends React.Component {

    static contextType = AppContext;
    constructor(props) {
        super(props);
    }

    render() {
        return <Box >
            <Container style={{ marginBottom: '10px' }}>
                <Grid container direction='row' justify='flex-start' spacing={9} style={{ maxWidth: '100%' }}>
                    <Grid xs={4} style={{ paddingTop: '5px' }} item>Investor name</Grid>
                    <Grid xs={2} style={{ paddingTop: '5px' }} item>Sold</Grid>
                    <Grid xs={4} style={{ paddingTop: '5px' }} item>% Purchased</Grid>
                </Grid>
            </Container>
            <Box style={{ overflowY: 'auto', height: '49vh' }}>
                {!this.context.loading && this.context.investments && this.context.investments.map((investment) => (
                    <InvestmentItem key={investment.id} data={investment} loan={this.context.selectedLoan}></InvestmentItem>
                ))}
            </Box>
        </Box>
    }

}

class InvestmentItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = { percentage: 0 }
    }

    componentDidMount() {
        let percentage = ((this.props.data.sold * 100) / this.props.loan.advance_amount).toFixed(2);
        this.setState({ percentage })
    }

    render() {
        return <Container style={{ backgroundColor: 'white', height: '80px', marginBottom: '2px', color: '#00cfc9', fontSize: '10pt' }}>
            <Grid container direction='row' justify='flex-start' spacing={9} style={{ maxWidth: '100%', marginTop: 0, marginBottom: 0 }}>
                <Grid xs={4} style={{ color: 'black', addingTop: '30px', paddingBottom: '30px' }} item>{this.props.data.investor_name}</Grid>
                <Grid xs={2} style={{ color: 'black', addingTop: '30px', paddingBottom: '30px' }} item>{this.props.data.formated_sold || 0}</Grid>
                <Grid xs={4} style={{ paddingTop: '5px', paddingBottom: '0' }} item >
                    <Box position="relative" display="inline-flex" style={{ margin: '0.6em auto 0 1.5em' }}>
                        <CircularProgress size='4em' color='#07d0ca' thickness={0.5} variant='static' value={100} />
                        <CircularProgress size='4em' color='#07d0ca' thickness={2} variant='static' value={this.state.percentage} style={{ position: 'absolute', left: 0 }} />
                        <Box top={0} left={0} bottom={0} right={0} position="absolute" display="flex" alignItems="center" justifyContent="center">
                            <Typography component='div' variant='caption' style={{ fontSize: '8pt' }}>{this.state.percentage}%</Typography>
                        </Box>
                    </Box>
                </Grid>
                <Grid xs={2} style={{ padding: '30px 10px' }} item container direction='row' justify='flex-start'>
                    <SvgIcon style={{ cursor: 'pointer' }}>
                        <path fill="none" d="M16.589 9L15.003 7.414 5.906 16.511 5.377 18.625 7.491 18.097z"></path><path transform="rotate(134.999 18.003 6)" fill="none" d="M16.882 4.879H19.125V7.122H16.882z"></path><path d="M4.003,21c0.081,0,0.162-0.01,0.242-0.03l4-1c0.176-0.044,0.337-0.135,0.465-0.263L21.003,7.414 c0.378-0.378,0.586-0.88,0.586-1.414s-0.208-1.036-0.586-1.414L19.417,3c-0.756-0.756-2.072-0.756-2.828,0L4.296,15.293 c-0.128,0.128-0.219,0.289-0.263,0.464l-1,4c-0.086,0.341,0.015,0.701,0.263,0.95C3.485,20.897,3.741,21,4.003,21z M18.003,4.414 L19.589,6l-1.586,1.586L16.417,6L18.003,4.414z M5.906,16.511l9.097-9.097L16.589,9l-9.098,9.097l-2.114,0.528L5.906,16.511z"></path>
                    </SvgIcon>
                    <SvgIcon style={{ cursor: 'pointer' }}>
                        <path d="M9.172 16.242L12 13.414 14.828 16.242 16.242 14.828 13.414 12 16.242 9.172 14.828 7.758 12 10.586 9.172 7.758 7.758 9.172 10.586 12 7.758 14.828z"></path><path d="M12,22c5.514,0,10-4.486,10-10S17.514,2,12,2S2,6.486,2,12S6.486,22,12,22z M12,4c4.411,0,8,3.589,8,8s-3.589,8-8,8 s-8-3.589-8-8S7.589,4,12,4z"></path>
                    </SvgIcon>
                </Grid>
            </Grid>
        </Container>
    }

}
class InvestmentRemain extends React.Component {

    render() {
        return <Container style={{ backgroundColor: '#00a3ad', padding: '0.5em 2em' }}>
            <Typography>Remaining amount {this.props.data.remain} of {this.props.data.total} </Typography>
            <BorderLinearProgress variant="determinate" value={this.props.data.percentage} />
            <Grid container direction='row' justify='space-between' style={{ fontSize: '8pt' }}>
                <span>{this.props.data.percentage}%</span>
                <span>100%</span>
            </Grid>
        </Container>
    }
}