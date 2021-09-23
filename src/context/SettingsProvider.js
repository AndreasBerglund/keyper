import React, { createContext, useReducer } from 'react'
import initialSettings from '../data/settings.json'

export const DispatchSettingsContext = createContext();
export const StateSettingsContext = createContext();

const initialState = {...initialSettings, isLoading : false, isReady: true}

const reducer = (state, action) => {
    switch (action.type) {
        case 'init_interface': {
            return {
                ...state
            }
        }
        case 'select' : {   
            const id = action.payload;
            return {
                ...state,
                selectedKeys : [...state.selectedKeys, id]
            }
        }
        case 'deselect' : {
            const id = action.payload;
            const index = state.selectedKeys.indexOf(id);
            return {
                ...state,
                selectedKeys: state.selectedKeys.splice(index, 1)
            }
        }
        default: {
            return {
                ...state
            }
        }
    }
}

const SettingsProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <DispatchSettingsContext.Provider value={dispatch} >
            <StateSettingsContext.Provider value={state} >
                {children}
            </StateSettingsContext.Provider>
        </DispatchSettingsContext.Provider>
    )
}

export default SettingsProvider
