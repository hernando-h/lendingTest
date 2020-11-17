/**
 * Module that expose static GUI navigation
 * @author hernando.shaolin@gmail.com
 * @version 2020-11-16
 */

import { createMuiTheme, makeStyles } from '@material-ui/core/styles';
import { Container, Fab, Grid, AppBar, Toolbar, InputBase, SvgIcon, Typography } from "@material-ui/core";

import logo from '../assets/logo.svg';

const theme = createMuiTheme();
const useStyles = makeStyles({
    navBar: {
        backgroundColor: '#2e2e2e',
        margin: 0,
    },
    toolBar: {
        padding: '0px',
        width: theme.breakpoints.values.md + ((window.innerWidth - theme.breakpoints.values.md) / 2),
    },
    logo: {
        height: "40px",
    },
    noOverflow: {
        overflow: 'show'
    },
    marginGrid: {
        '& > *': {
            marginRight: "15px",
        }
    },
    userflag: {
        fill: '#f4f4f4',
    },
    button: {
        boxShadow: "none",
        maxHeight: "30px",
        backgroundColor: 'transparent',
        color: '#878787',
        pointerEvents: 'none',
    }
});

export default function CoreNavigation() {
    const classes = useStyles();
    return (
        <AppBar className={classes.navBar}>
            <Container disableGutters={true} maxWidth="md" className={classes.noOverflow}>
                <Toolbar className={classes.toolBar} variant='dense'>
                    <img src={logo} className={classes.logo} />
                    <Grid container direction="row" justify="space-between"
                        alignContent="center" alignItems="center"
                        style={{ width: "100%", color: 'gray' }}>
                        {letfOptionsMenu(classes)}
                        <Grid item xs={3} alignContent="center" alignItems="center">
                            <Typography variant="h4" noWrap>QA</Typography>
                        </Grid>
                        {rightOptionsMenu(classes)}
                        {userOptionsMenu(classes)}
                    </Grid>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

function letfOptionsMenu(classes) {
    return (
        <Grid item xs={3} alignContent="center" alignItems="center" className={classes.marginGrid}>
            <Typography variant="caption">APPLICATION</Typography>
            <span>
                <Typography variant="caption">SEARCH</Typography>
                <SvgIcon style={{ width: "12px", height: '12px', margin: '0 5px' }}>
                    <path d="M10,18c1.846,0,3.543-0.635,4.897-1.688l4.396,4.396l1.414-1.414l-4.396-4.396C17.365,13.543,18,11.846,18,10 c0-4.411-3.589-8-8-8s-8,3.589-8,8S5.589,18,10,18z M10,4c3.309,0,6,2.691,6,6s-2.691,6-6,6s-6-2.691-6-6S6.691,4,10,4z" transform='rotate(90 12 12)'></path>
                </SvgIcon>
                <SvgIcon style={{ width: "12px", height: '12px', margin: '0 5px 0 0' }}>
                    <path d="M11.178,19.569C11.364,19.839,11.672,20,12,20s0.636-0.161,0.822-0.431l9-13c0.212-0.306,0.236-0.704,0.063-1.033 C21.713,5.207,21.372,5,21,5H3C2.628,5,2.287,5.207,2.114,5.536C1.941,5.865,1.966,6.263,2.178,6.569L11.178,19.569z"></path>
                </SvgIcon>
            </span>
        </Grid>
    );
}

function rightOptionsMenu(classes) {
    return (
        <Grid item xs={3} justify="flex-end" alignContent="center" alignItems="center">
            <Typography variant="caption">DASHBOARD</Typography>
            <Fab variant="extended" className={classes.button} >
                <SvgIcon style={{ marginRight: '5px', width: "16px", height: '16px' }}>
                    <path d="M6,22h12h1c1.104,0,2-0.896,2-2V4c0-1.104-0.896-2-2-2h-1H6H5C3.896,2,3,2.896,3,4v16c0,1.104,0.896,2,2,2H6z M12,4.999 c1.647,0,3,1.351,3,3C15,9.647,13.647,11,12,11S9,9.647,9,7.999C9,6.35,10.353,4.999,12,4.999z M6,17.25c0-2.219,2.705-4.5,6-4.5 s6,2.281,6,4.5V18H6V17.25z"></path>
                </SvgIcon>
                USER ADMIN
            </Fab>
        </Grid>
    );
}

function userOptionsMenu(classes) {
    return (
        <SvgIcon style={{ width: "144px", height: '48px' }} viewBox="0 0 144 48">
            <g transform="translate(73 -484)">
                <path style={{ fill: '#f4f4f4' }} class="a" d="M80-370v-48h96v48Zm-48,0,48-48v48Z" transform="translate(-105 902)" />
                <g transform="translate(5 49.036)">
                    <path style={{ fill: '#878787' }} d="M11.217,2A9.34,9.34,0,0,0,2,11.217a9.34,9.34,0,0,0,9.217,9.217,9.34,9.34,0,0,0,9.217-9.217A9.34,9.34,0,0,0,11.217,2Zm0,4.609a2.686,2.686,0,0,1,2.765,2.765,2.686,2.686,0,0,1-2.765,2.765A2.686,2.686,0,0,1,8.452,9.374,2.686,2.686,0,0,1,11.217,6.609ZM6.511,15.615A4.571,4.571,0,0,1,10.3,13.588h1.843a4.57,4.57,0,0,1,3.785,2.028,6.42,6.42,0,0,1-9.412,0Z" transform="translate(-39 449.687)" />
                    <text style={{ color: '#878787', fontSize: '0.75rem', fontFamily: 'Baloo 2' }} class="b" transform="translate(11 466.964)">
                        <tspan x="-26.066" y="0">ADMIN</tspan>
                    </text>
                    <path style={{ fill: '#878787' }} d="M4.942,9.67a.32.32,0,0,0,.527,0L8.354,5.5A.321.321,0,0,0,8.09,5H2.32a.32.32,0,0,0-.264.5Z" transform="translate(25 453.961)" />
                </g>
            </g>
        </SvgIcon>
    );
}