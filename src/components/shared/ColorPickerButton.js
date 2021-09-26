import React from "react";
import styled from "styled-components";
import { Button } from "./Button";

export const StyledColorPickerButton = styled(Button)`
  width: 30px;
  height: 30px;
  background-color: ${(props) => props.color};
  border: 1px solid #d2d2d2;
  ${(props) => props.selected && `box-shadow:0px 0px 0px 2px #232323;`}
  transition: none;

  /* states */
    &:hover {
    box-shadow: 0px 0px 0px 2px #232323;
    background-color: ${(props) => props.color};
  }
`;

const ColorPickerButton = (props) => {
  return (
    <StyledColorPickerButton
        {...props}
    ></StyledColorPickerButton>
  );
};

export default ColorPickerButton;
