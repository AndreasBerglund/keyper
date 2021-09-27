import { useContext, useRef, useEffect, useState } from "react";
import { CanvasTexture } from "three";
import { DispatchKeyboardContext } from "../context/KeyboardProvider";
import { StateApplierContext } from "../context/ApplierProvider";

const KeyPrint = ({ keyData, setTextureLoaded }) => {
  const { colors } = useContext(StateApplierContext);
  const dispatchKeyboard = useContext(DispatchKeyboardContext);
  const canvasStyle = {
    position: "fixed",
    zIndex: 0,
    left: 0,
    top: 0,
    backgroundColor: "blue",
    display: "none",
  };

  const canvas = useRef(null);

  const [canvasTexture, setCanvasTexture] = useState(null);

  useEffect(() => {
    const texture = new CanvasTexture(canvas.current);
    setTextureLoaded(keyData.key_id, texture);
    setCanvasTexture(texture);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyData]);

  useEffect(() => {
    const {
      state: { capColorId, charColorId },
    } = keyData;
    const capColor = colors.find((c) => c.id === capColorId);
    const charColor = colors.find((c) => c.id === charColorId);
    if (canvasTexture) {
      const ctx = canvas.current.getContext("2d");
      ctx.canvas.width = 1024;
      ctx.canvas.height = 1024;
      ctx.fillStyle = capColor.colorValue;
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.font = "70px Rubik";
      ctx.textAlign = "center";
      ctx.fillStyle = charColor.colorValue;
      ctx.fillText(keyData.map, ctx.canvas.width / 2, ctx.canvas.height / 2.5);
      dispatchKeyboard({ type: "render_after_canvas_update" });
      // canvasTexture.uuid
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyData]);

  return <canvas ref={canvas} style={canvasStyle}></canvas>;
};

const KeyPrinter = ({ keys }) => {
  const dispatchKeyboard = useContext(DispatchKeyboardContext);
  const [loadedTextures, setLoadedTextures] = useState([]);

  const setTextureLoaded = (id, texture) => {
    if (
      loadedTextures.filter((prevLoadedTexture) => prevLoadedTexture.id === id)
        .length === 0
    ) {
      setLoadedTextures((prevLoadedTextures) => [
        ...prevLoadedTextures,
        { id, texture },
      ]);
    }
  };

  useEffect(() => {
    if (loadedTextures.length === keys.length) {
      dispatchKeyboard({ type: "set_print_maps", payload: loadedTextures });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadedTextures]);

  useEffect(() => {
    dispatchKeyboard({ type: "init_print_maps" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {keys.map((key) => (
        <KeyPrint
          key={key.key_id}
          keyData={key}
          setTextureLoaded={setTextureLoaded}
        />
      ))}
    </>
  );
};

export default KeyPrinter;
