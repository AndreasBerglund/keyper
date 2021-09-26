import React, { createContext, useReducer } from 'react'


export const DispatchApplierContext = createContext();
export const StateApplierContext = createContext();

const initialState = {
    colors : [
        {
            id : 1,
            colorValue : "#1A1A1A"
        },
        {
            id : 2,
            colorValue : "#F9F9F9"
        },
        {
            id : 3,
            colorValue : "#D0CCC0"
        },
        {
            id : 4,
            colorValue : "#96938E"
        },
        {
            id : 5,
            colorValue : "#60605B"
        },
        {
            id : 6,
            colorValue : "#373534"
        },
        {
            id : 7,
            colorValue : "#FBBBC9"
        },
        {
            id : 8,
            colorValue : "#C9282D"
        },
        {
            id : 9,
            colorValue : "#5F3032"
        },
        {
            id : 10,
            colorValue : "#8ED7B0"
        }

    ],
    selectedColorId : 1,
    target: "cap" //"print"
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'change_color' : {
            return {
                ...state,
                selectedColorId: action.payload
            }
        }
        case 'toggle_target' : {
            return {
                ...state,
                target : state.target === "cap" ? "print" : "cap"
            }
        }
        default: {
            return {
                ...state
            }
        }
    }
}

const ApplierProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <DispatchApplierContext.Provider value={dispatch} >
            <StateApplierContext.Provider value={state} >
                {children}
            </StateApplierContext.Provider>
        </DispatchApplierContext.Provider>
    )
}

export default ApplierProvider
