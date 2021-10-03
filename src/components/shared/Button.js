import styled, { css } from "styled-components";

export const inputBase = css`
  background: transparent;
  color: #acacac;

  border-color: #acacac;
  border-style: solid;
  border-width: 2px;
  border-radius: 5px;

  font-size: 12px;
  font-family: "Rubik";
  font-weight: 500;

  padding: 10px 14px;
  cursor: pointer;

`;

export const Button = styled.button`
  ${inputBase}

  /* states */
  &:hover {
    background: #acacac30;
  }
  &:active {
    background: transparent;
    border-color: #232323;
    color: #232323;
    transition: none;
  }

  /* relation to others */
  margin-right: 10px;
  margin-top: 10px;

  transition: all 0.5s;
`;

export const PrimaryButton = styled(Button)`
  background: #232323;
  color: #ebebeb;

  border-color: #232323;

  /* states */
  &:hover {
    background: #232323;
  }
  &:active {
    background: transparent;
    color: #232323;
  }
`;


export const SmallCloseButton = styled(Button)`
  /* border: none; */
  padding: 0;
  margin : 0;
  width: 24px;
  height: 24px;
  border-width: 1px;
  border-color: transparent;
  /* background: #232323; */
  border-radius: 16px;
  position: relative;
  &:after, &:before { 
    position: absolute;
    content: "";
    width: 12px;
    height: 1px;
    background: #acacac;
    top: 10px;
    left: 5px;
  }
  &:after { 
    transform: rotate(45deg)
  }
  &:before { 
    transform: rotate(-45deg)
  }
  &:focus, &:active {
    border-color: transparent;
  }
`;

export const SquareButton = styled(Button)`
    width: 33px;
    height: 33px;
    padding: 0;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;

    background-color: white;
    border-color: transparent;

    &:hover, &:active {
      background-color: white;
    }
`; 

