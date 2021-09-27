import { useContext } from "react";
import Scene from "../components/three/Scene";
import Loader from "../components/Loader";
import Panel from "../components/Panel";
import KeyPrinter from "../components/KeyPrinter";
import { StateKeyboardContext } from "../context/KeyboardProvider";
import * as Styled from "./styled";
import MessageProvider from "../context/MessageProvider";

const App = () => {
  const { keys, isLoading, modelsLoaded, texturesLoaded, printMapsLoaded } =
    useContext(StateKeyboardContext);
  return (
      <Styled.App>
          <MessageProvider>
        { (!modelsLoaded || !texturesLoaded) && isLoading ? (
          <Loader zIndex={1000} />
        ) : (
          <>
            <KeyPrinter keys={keys} />
            { printMapsLoaded ? 
            <>
              <Panel />
              <Scene />
            </> : 
            <Loader zIndex={0} /> 
            }
          </>
        )}
        </MessageProvider>
      </Styled.App>
  );
};

export default App;
