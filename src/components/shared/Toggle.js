import React from "react";
import styled from "styled-components";
import { inputBase } from "./Button";

const Toggle = (props) => {
  const { v1, v2, value, onChangeHandler } = props;
  return (
    <StyledToggle v1={v1} v2={v2} value={value}>
      <div onClick={()=>onChangeHandler()}>
        <span>{v1}</span>
        <span>{v2}</span>
        <span>{value === v1 ? v1 : v2}</span>
      </div>
    </StyledToggle>
  );
};

export default Toggle;

const StyledToggle = styled.div`
  display: flex;

  & > div {
    ${inputBase}
    position: relative;
    padding-left: 0;
    padding-right: 0;
    padding: 0;
    border-width: 1px;
    span {
      ${inputBase}
      border-width: 1px;
      border-color: transparent;
      text-transform: capitalize;
      display: inline-block;
      &:nth-child(1){
        ${(props) => (props.v1 === props.value ? `color: #232323; ` : ``)};
      }
      &:nth-child(2){
        ${(props) => (props.v2 === props.value ? `color: #232323; ` : ``)};
      }
    }
    span:last-child {
      /* opacity: 0; */
      ${inputBase}
      color: transparent;
      position: absolute;
      left: ${(props) => (props.v1 === props.value ? "-2px" : "auto")};
      right: ${(props) => (props.v1 === props.value ? "auto" : "-1px")};
      top: -1px;
      border-width: 2px;
      border-color: #232323;
      transition: all .5s ease-in-out;
    }
  }
`;
