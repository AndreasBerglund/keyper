import React, { createContext, useReducer } from "react";
import styled from "styled-components";
import { SmallCloseButton } from "../components/shared/Button";

export const DispatchMessageContext = createContext();
export const StateMessageContext = createContext();

const initialState = {
  headline: "Hi and welcome to Tasty Caps!",
  message:
    "Tasty caps is a custom keyboard design tool, that allows you to design and view your custom keyboard in 3D! Start by choosing a new cap color on the top right panel.",
  show: true
};

const reducer = (state, action) => {
  switch (action.type) {
    case "set_message": {
      return {
        ...state,
        show: true,
        message: action.payload,
      };
    }
    case "close_message" : {
        return {
            ...state,
            show: false
        }
    }

    default: {
      return {
        ...state,
      };
    }
  }
};

const MessageProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <DispatchMessageContext.Provider value={dispatch}>
      <StateMessageContext.Provider value={state}>
          { state.show && 
            <Message>
            <h5>{state.headline}</h5>
            <p>{state.message}</p>
            <SmallCloseButton onClick={ () => dispatch({type:"close_message"})} />
            </Message>
          }
        {children}
      </StateMessageContext.Provider>
    </DispatchMessageContext.Provider>
  );
};

export default MessageProvider;

const Message = styled.div`
  padding: 40px;
  background: #fff;
  position: absolute;
  border-radius: 5px;
  bottom: 40px;
  left: 40px;
  z-index: 1;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.3);
  min-width: 200px;
  max-width: 320px;
  & > p {
    font-family: "Rubik";
  }
  & > h5 {
    margin-top: 0;
  }
  ${SmallCloseButton} {
      position : absolute;
      right: 9px; top: 9px;
  }
`;
