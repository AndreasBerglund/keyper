import React, { useContext } from "react";
import {
  DispatchKeyboardContext
} from "../../context/KeyboardProvider";
import { Button } from "../shared/Button";
import styled from "styled-components";
import ColorPickerGroup from "./ColorPickerGroup";
import { DispatchApplierContext, StateApplierContext } from "../../context/ApplierProvider";
import Toggle from "../shared/Toggle";

const Panel = ({ changeLayout, changeColors }) => {

  const dispatchKeyboard = useContext(DispatchKeyboardContext);
  const { colors, selectedColorId, target } = useContext(StateApplierContext);
  const dispatchApplier = useContext(DispatchApplierContext);

  const applyColor = (e) => {
    dispatchKeyboard({
      type: "apply_color",
      payload: {
        colorId: colors.find((c) => selectedColorId === c.id).id,
        selection: e.target.value,
        target: target
      },
    });
  };

  return (
    <StyledPanel>
      <div>
        <ColorPickerGroup />
        <div>
          <h5>Target</h5>
          <Toggle v1="cap" v2="print" value={target} onChangeHandler={() => dispatchApplier({type:"toggle_target"})}></Toggle>
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
        <span>v.0.1 © Andreas Berglund</span>
      </Logo>
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

  h5 {
    margin-top: 50px;
    margin-bottom: 10px;
  }
`;

const Logo = styled.div`
  margin-bottom: 120px;
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
`;
