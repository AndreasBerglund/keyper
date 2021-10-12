import React, { useContext, useState } from "react";
import { DispatchKeyboardContext } from "../../context/KeyboardProvider";
import { Button, SquareButton } from "../shared/Button";
import styled from "styled-components";
import ColorPickerGroup from "./ColorPickerGroup";
import {
  DispatchApplierContext,
  StateApplierContext,
} from "../../context/ApplierProvider";
import Toggle from "../shared/Toggle";
import { ReactComponent as ArrowLeft } from "../../svg/arrow_left.svg";

const Panel = ({ changeLayout, changeColors }) => {
  const dispatchKeyboard = useContext(DispatchKeyboardContext);
  const { colors, selectedColorId, target } = useContext(StateApplierContext);
  const dispatchApplier = useContext(DispatchApplierContext);
  const [open, setOpen] = useState(true);

  const applyColor = (e) => {
    dispatchKeyboard({
      type: "apply_color",
      payload: {
        colorId: colors.find((c) => selectedColorId === c.id).id,
        selection: e.target.value,
        target: target,
      },
    });
  };

  return (
    <StyledPanel className={open ? "open" : "closed"}>
      <div>
        <ColorPickerGroup />
        <div>
          <h5>Target</h5>
          <Toggle
            v1="cap"
            v2="print"
            value={target}
            onChangeHandler={() => dispatchApplier({ type: "toggle_target" })}
          ></Toggle>
        </div>
        <div>
          <h5>Apply to</h5>
          <Button onClick={applyColor} value="modifier">
            Modifiers
          </Button>
          <Button onClick={applyColor} value="alphanumeric">
            Alphanumeric
          </Button>
          <Button onClick={applyColor} value="all_keys">
            All keys
          </Button>
          {/* <PrimaryButton>Apply</PrimaryButton> */}
        </div>
      </div>
      <Logo>
        <span>Tasty caps</span>
        <span>
          <a href="https://github.com/AndreasBerglund/keyper">github</a>
        </span>
      </Logo>
      <SquareButton
        onClick={() => {
          setOpen(!open);
        }}
      >
        <ArrowLeft />
      </SquareButton>
    </StyledPanel>
  );
};

export default Panel;

const StyledPanel = styled.div`
  width: 320px;
  height: 100%;
  position: fixed;
  z-index: 1;
  padding: 40px;
  background: #fff;
  right: 0;
  top: 0;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: right 0.25s ease-in;
  &.closed {
    right: -380px;
    transition: right 0.25s ease-out;
  }
  @media (max-width: 375px) {
    width: 275px;
    &.closed {
      right: -320px;
    }
  }

  h5 {
    margin-top: 50px;
    margin-bottom: 10px;
  }

  ${SquareButton} {
    position: absolute;
    left: calc(-33px / 2);
    bottom: 100px;
    & > svg {
      margin-right: 4px;
    }
  }
  &.closed {
    ${SquareButton} {
      & > svg {
        transform: rotate(180deg) translateX(-4px);
      }
    }
  }
`;

export const Logo = styled.div`
  margin-bottom: 120px;
  @media (max-width: 375px) {
    margin-bottom: 60px;
  }
  opacity: 1;
  ${(props) =>
    props.pulse &&
    `
  animation-name: pulse;
  animation-duration: 2s;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  `}
  span {
    display: block;
    text-align: center;
  }
  span:first-child {
    color: #232323;
    font-size: 48px;
    font-family: "BillionDreams";
    font-weight: bold;
    display: block;
  }
  span {
    font-size: 10px;
    color: #232323;
  }
  @keyframes pulse {
    0% {
      opacity: 0.35;
    }
    100% {
      opacity: 1;
    }
  }
`;
