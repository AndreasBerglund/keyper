import React, { useEffect, useState, useContext } from "react";
import { StateApplierContext } from "../../context/ApplierProvider";
import {
  DispatchKeyboardContext,
  StateKeyboardContext,
} from "../../context/KeyboardProvider";

const Key = ({ textures, position, modelKey, printTexture, key_id }) => {
  //colors
  const { selectedColorId, target } = useContext(StateApplierContext);

  //all resources
  const dispatchKeyboard = useContext(DispatchKeyboardContext);
  const { resources, keys } = useContext(StateKeyboardContext);

  //model
  const model = resources.models[modelKey];
  const geometry = model.scene.clone(true);

  //textures
  const _textures = {};
  textures.forEach((texture) => {
    const textureResource = resources.textures[texture.textureKey];
    _textures[texture.type] = textureResource;
  });

  //orient print map
  printTexture.flipX = false;
  printTexture.flipY = false;
  printTexture.needsUpdate = true;

  const keyPosition= [position.x, position.y, 0];
  const selectorPosition = [position.x + 0.5, position.y + 0.5, 0.5];

  const [hovered, setHover] = useState(false);
  const [selected, setSelected] = useState(false);

  const clickedKey = (e) => {
    dispatchKeyboard({
      type: "apply_color",
      payload: { colorId: selectedColorId, selection: [key_id], target: target },
    });
  };

  useEffect(() => {
    const thisKey = keys.find((key) => key_id === key.key_id);
    setSelected(thisKey.state.selected);
  }, [keys, key_id]);

  return (
    <>
      <mesh
        castShadow={false}
        receiveShadow={false}
        position={keyPosition}
        onClick={clickedKey}
        onPointerOver={(e) => setHover(true)}
        onPointerOut={(e) => setHover(false)}
      >
        <bufferGeometry attach="geometry" {...geometry.children[0].geometry} />
        <meshPhysicalMaterial
          {..._textures}
          map={printTexture}
          metalness={0}
          roughness={0.15}
          reflectivity={1}
          clearcoat={0.4}
        />
      </mesh>
      <mesh position={keyPosition} visible={hovered ? true : false}>
        <bufferGeometry attach="geometry" {...geometry.children[0].geometry} />
        <meshBasicMaterial color={"#fff"} transparent={true} opacity={0.19} />
      </mesh>
      {/* <mesh position={keyPosition} visible={selected ? true : false}>
        <bufferGeometry attach="geometry" {...geometry.children[0].geometry} />
        <meshBasicMaterial color={'#444'} flatShading={true} wireframe />
      </mesh> */}

      <mesh position={selectorPosition} visible={selected ? true : false}>
        <meshBasicMaterial color={"#fff"} flatShading={true} />
        <sphereGeometry args={[0.05, 16, 16]} />
      </mesh>
    </>
  );
};

export default Key;
