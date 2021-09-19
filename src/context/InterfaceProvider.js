import React, { createContext, useReducer } from 'react'

export const DispatchInterfaceContext = createContext();
export const StateInterfaceContext = createContext();

const initialState = {
    allKeys : [],
    selectedKeys: [] //selected keys
}

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
        case 'changeColor' : {
            const value = action.payload;
            return { 
                ...state,
            }
        }
        default: {
            return {
                ...state
            }
        }
    }
}

const InterfaceProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <DispatchInterfaceContext.Provider value={dispatch} >
            <StateInterfaceContext.Provider value={state} >
                {children}
            </StateInterfaceContext.Provider>
        </DispatchInterfaceContext.Provider>
    )
}

export default InterfaceProvider
