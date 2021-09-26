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
