import { useContext } from 'react'
import './App.css';

import Scene from './components/three/Scene'
import Loader from './components/Loader'
import Interface from './components/Interface'
import KeyPrinter from './components/KeyPrinter'
import { StateKeyboardContext } from './context/KeyboardProvider';


const App = () => {
    const { keys, isLoading, modelsLoaded, texturesLoaded, printMapsLoaded } = useContext(StateKeyboardContext);
    const appStyle = { width: '100%', height: '100vh', backgroundColor: '#fff' }
    return (
        <div className="App" style={appStyle} >
            {!modelsLoaded && !texturesLoaded && isLoading ? <Loader zIndex={1000} /> :
                <>
                    <KeyPrinter keys={keys} />
                    <Loader zIndex={0} />
                    {printMapsLoaded &&
                        <>
                            <Interface />
                            <Scene />
                        </>
                    }
                </>
            }
        </div>
    )
}

export default App;