import "./App.scss";

import React from 'react';

import { Box, Container } from '@material-ui/core';
import { createMuiTheme, responsiveFontSizes, ThemeProvider } from "@material-ui/core/styles";

import AppState from './state/AppState';

import AppNavigation from "./components/static/Navigation";
import AppContainer from "./components/static/AppContainer";

function App() {

    return (
        <AppState>
            <Container maxWidth="xl">
                <Box className="backgroundBorder"></Box>
                <AppNavigation></AppNavigation>
                <AppContainer></AppContainer>
                <Container maxWidth="xl" style={{color:'#00a3ad',width:'100%',textAlign:'center',marginTop:'2em',fontSize:'10pt'}}>
                <span >© LendingFront 2016</span>
                </Container>
            </Container>
        </AppState>
    );
}

export default App;
