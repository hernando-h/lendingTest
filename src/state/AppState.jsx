/**
 * Application State, using react context hook
 * @author hernando.shaolin@gmail.com
 * @version 2020-11-16
 */
import React from 'react';

URL = 'https://5fac266a03a60500167e797a.mockapi.io/api/v1/';


export const AppContext = React.createContext();

/** This Assign the data for state object, through dispatch function. */
const AppReducer = (state, { type, payload }) => {

    switch (type) {
        case 'getLoans': return {
            ...state,
            loans: payload
        }
        case 'getInvestments': return {
            ...state,
            investments: payload
        }
        case 'selectLoan': return {
            ...state,
            selectedLoan: payload
        }
        case 'setLoading': return {
            ...state,
            loading: payload
        }
        case 'currentRemain': return {
            ...state,
            currentRemain: payload
        }
    }

}

/** This be wrap the root Component, contains the logic behaviour for the application state. */
const AppState = ({ children }) => {

    const initialState = {
        loans: [],
        investments: [],
        currentRemain:{},
        selectedLoan: null,
        loading: true
    }

    const [state, dispatch] = React.useReducer(AppReducer, initialState);

    const getLoans = (payload) => {
        dispatch({ type: 'setLoading', payload: true });
        console.log('si entra getLoans');
        fetch(URL + 'loans').then(response => response.json())
            .then(data => {
                let formater = Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'})
                for (let index = 0; index < data.length; index++) {
                    const element = data[index];
                    let formated_amount = formater.format(element.advance_amount);
                    Object.assign(element,{formated_amount});
                }
                dispatch({ type: 'getLoans', payload: data });
                dispatch({ type: 'setLoading', payload: false });
            }).catch(e => {
                console.log('error to fetch getLoans');
                console.log(e);
            })
    }

    const getInvestments = (payload) => {
        dispatch({ type: 'selectLoan', payload });
        dispatch({ type: 'setLoading', payload: true });

        fetch(URL + 'loans/' + payload.id + '/investments').then(response => response.json())
            .then(data => {
                let remain  = 0;
                let formater = Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'});
                for (let index = 0; index < data.length; index++) {
                    const element = data[index];
                    let formated_sold = formater.format(element.sold);
                    Object.assign(element,{formated_sold});
                    remain += element.sold;
                }
                let percentage = ((remain * 100) / payload.advance_amount).toFixed(2);
                dispatch({ type: 'getInvestments', payload: data });
                dispatch({ type: 'setLoading', payload: false });
                dispatch({ type: 'currentRemain', payload:{
                    total: formater.format(payload.advance_amount),
                    remain:formater.format(remain),
                    percentage
                }});
            }).catch(e => {
                console.log('error to fetch getInvestments');
                console.log(e);
            })
    }

    const selectLoan = (payload) => {
        dispatch({ type: 'selectLoan', payload });
    }            

    const { loans, investments,currentRemain, selectedLoan, loading } = state;

    return (
        <AppContext.Provider value={{ loans, investments,currentRemain, selectedLoan, loading, getLoans, getInvestments, selectLoan }}>
            {children}
        </AppContext.Provider>
    )
}
export default AppState;