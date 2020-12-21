import { useState, useEffect, useReducer } from 'react'
import initialSettings from './data/settings.json'

import { getCaseData, getKeyData, getKeyLayout } from "./helpers/dataLoader"
import { getCase, getGeometry, getKeys, getMaterialTextures } from "./helpers/resourceLoader"

import Scene from './components/three/Scene'
import Loader from './components/Loader'
import Interface from './components/Interface'

const resourceReducer = (state, action) => {
    switch (action.type) {

        case 'DATA_LOADED':
            return {
                ...state,
                isLoading: true,
                case: { ...state.case, data: action.payload }
            }
        case 'CASE_RESOURCES_LOADED' : 
            return {
                ...state,
                case : action.payload
            }
        case 'KEY_RESOURCES_LOADED':
            return {
                ...state,
                isLoading: false,
                keys: action.payload
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
        { case: {}, keys: [], scene: [], props: [], loading: '', isLoading: false, isError: false }
    )

    const casedata = getCaseData(settings.case); //could be async
    const keydata =  getKeyData(settings.keys)

    const changeLayout = (e) => {
        setSettings({ ...settings, layout : e.target.value })
    }
    const changeColors = (e) => {
        setColors( { color: 'blue'} )
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
            })
        })

     
    }, [settings])

    useEffect(() => {
        console.log('some settings change')
    }, [colors])

    return (
        <div className="App" style={appStyle} >
            { resources.isLoading ? <Loader /> : 
            <>
                <Interface changeLayout={changeLayout} changeColors={changeColors} />
                <Scene resources={ resources }/> 
            </>
            }
        </div>
    )
}

export default App;