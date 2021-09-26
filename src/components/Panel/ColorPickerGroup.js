import React, { useContext } from "react";
import { DispatchApplierContext, StateApplierContext } from "../../context/ApplierProvider";
import ColorPickerButton from "../shared/ColorPickerButton";

const ColorPickerGroup = () => {
  const { colors, selectedColorId } = useContext(StateApplierContext);
  const dispatchColor = useContext(DispatchApplierContext);
  return (
    <div>
      <h5 style={{ marginTop: 0 }}>Choose a color</h5>
      <div>
        {colors.map((c) => {
          return (<ColorPickerButton
            key={c.id}
            color={c.colorValue}
            selected={selectedColorId === c.id}
            onClick={ () => {dispatchColor({ type: "change_color", payload: c.id }) }}
          />);
        })}
      </div>
    </div>
  );
};

export default ColorPickerGroup;
