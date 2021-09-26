import { useContext } from 'react'
import Scene from '../components/three/Scene'
import Loader from '../components/Loader'
import Panel from '../components/Panel'
import KeyPrinter from '../components/KeyPrinter'
import { StateKeyboardContext } from '../context/KeyboardProvider';
import * as Styled from './styled'

const App = () => {
    const { keys, isLoading, modelsLoaded, texturesLoaded, printMapsLoaded } = useContext(StateKeyboardContext);
    return (
        <Styled.App>
            {!modelsLoaded && !texturesLoaded && isLoading ? <Loader zIndex={1000} /> :
                <>
                    <KeyPrinter keys={keys} />
                    <Loader zIndex={0} />
                    {printMapsLoaded &&
                        <>
                            <Panel />
                            <Scene />
                        </>
                    }
                </>
            }
        </Styled.App>
    )
}

export default App;
