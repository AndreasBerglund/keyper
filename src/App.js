import { useState, useEffect, useReducer } from 'react'
import initialSettings from './data/settings.json'

import { getCaseData, getKeyData, getKeyLayout, getEnvironmentData } from "./helpers/dataLoader"
import { getCase, getKeys, getEnv } from "./helpers/resourceLoader"


import Scene from './components/three/Scene'
import Loader from './components/Loader'
import Interface from './components/Interface'
import KeyPrinter from './components/KeyPrinter'

const resourceReducer = (state, action) => {
    switch (action.type) {

        case 'DATA_LOADED':
            return {
                ...state,
                isLoading: true,
                case: { ...state.case, data: action.payload }
            }
        case 'CASE_RESOURCES_LOADED' : 
            console.log('case')
            return {
                ...state,
                isLoading: true,
                case : action.payload
            }
        case 'KEY_RESOURCES_LOADED':
            return {
                ...state,
                isLoading: true,
                keys: action.payload
            }
        case 'KEY_LOADED_PRINT_MAPS' :
            const newKeys = state.keys;
            newKeys.forEach((key, index) => {
                let resourceIndex = action.payload.findIndex( x => x.id === key.key_id); 
                newKeys[index].textures['map'] = action.payload[resourceIndex].texture ;
            });
            return {
                ...state,
                isLoading: true,
                printsLoaded: true,
                keys: newKeys
            }
        case 'ENV_RESOURCES_LOADED' :
            return {
                ...state,
               isLoading: false,
               scene : action.payload
            }
        default:
            throw new Error()
    }
}

const App = () => {
    const appStyle = { width: '100%', height: '100vh', backgroundColor: '#ccc' }
    const [settings, setSettings] = useState(initialSettings)
    const [colors, setColors] = useState( { color : 'red'})

    const [resources, dispatchResources] = useReducer(
        resourceReducer,
        { case: {}, keys: [], scene: [], props: [], loading: '', isLoading: false, printsLoaded: false, isError: false }
    )

    const casedata = getCaseData(settings.case); //could be async
    const keydata =  getKeyData(settings.keys)

    const changeLayout = (e) => {
        setSettings({ ...settings, layout : e.target.value })
    }
    const changeColors = (e) => {
        setColors( { color: 'blue'} )
    }
    const setKeyPrintMaps = ( loadedTextures ) => {
        //set key print maps in resources.keys
        dispatchResources({ type: 'KEY_LOADED_PRINT_MAPS', payload: loadedTextures } );
    }
   
    
    useEffect(() => {
        dispatchResources({ type: 'DATA_LOADED', payload: casedata })
        
        console.log('reload')
        
        
        //LOAD KEY DATA, MODEL AND TEXTURES
        const rows = getKeyLayout(settings);
        getCase(settings, casedata).then( res => {
            dispatchResources({ type: 'CASE_RESOURCES_LOADED', payload: res });
            getKeys(rows, settings, casedata, keydata).then(res => {
                dispatchResources({ type: 'KEY_RESOURCES_LOADED', payload: res });
                getEnv( getEnvironmentData() ).then( res => {
                    dispatchResources({ type: 'ENV_RESOURCES_LOADED', payload: res });
                })
            })
        })
        
        
        // DefaultLoadingManager.onLoad = () => { dispatchResources({ type: "THREE_READY"}); console.log('finished loading ')}
        // DefaultLoadingManager.onError = err => console.log(err)
        // DefaultLoadingManager.onProgress = ( url, itemsLoaded, itemsTotal ) => {
    
        //     console.log( 'Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
        
        // };
    
        
    }, [settings])

    useEffect(() => {
        console.log('some settings change')
    }, [colors])

    return (
        <div className="App" style={appStyle} >
            { resources.isLoading ? <Loader /> : 
                <>
                { !resources.printsLoaded ? 
                    <KeyPrinter keys={ resources.keys } setKeyPrintMaps={setKeyPrintMaps} /> :
                    <>
                        <Interface changeLayout={changeLayout} changeColors={changeColors} />
                        <Scene resources={ resources } /> 
                    </>
                }
                </>
            }
        </div>
    )
}

export default App;