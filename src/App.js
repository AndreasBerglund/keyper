import { useState, useEffect, useReducer } from 'react'

import { buildSceneObject, getGeometry, isInResourcePool, getFromResourcePool, loadTexture } from "./helpers/resourceLoader"
import initialSettings from './data/settings.json'

import Scene from './components/three/Scene'
import Loader from './components/Loader'
import Interface from './components/Interface'
import KeyPrinter from './components/KeyPrinter'
import { DefaultLoadingManager } from 'three'
import { getRandomColor } from './helpers/helpers'

const keyboardReducer = (state, action) => {
    switch (action.type) {
        case 'KEYBOARD_LOAD_INIT':
            return {
                ...state,
                isLoading: true
            }
        case 'KEYBOARD_LOADED':
            return {
                ...state,
                isLoading: false,
                ...action.payload
            }
        
        case 'ADD_RESOURCE_TO_RESOURCE_POOL': 
            return {
                ...state,
                resourcePool: [...state.resourcePool, action.payload]
        }
        case 'KEYBOARD_LOADED_PRINT_MAPS' :
            const newKeys = [...state.keys];
            newKeys.forEach( key => {
                const resourceIndex = action.payload.findIndex( x => x.id === key.key_id); 
                const printMap = { type: 'map', resource: action.payload[resourceIndex].texture }
                const map = key.textures.find( texture => texture.type == 'map' )
                const arr = [...key.textures]
                if ( !map ) { arr.push(printMap) } 
                key.textures = arr
            })
            return {
                ...state,
                printsLoaded: true,
                keys: newKeys
            }
        default:
            throw new Error()
    }
}

const App = () => {
  
    const appStyle = { width: '100%', height: '100vh', backgroundColor: '#fff' }
  
    const [settings, setSettings] = useState(initialSettings)

    const [keyboard, dispatchKeyboard] = useReducer(
        keyboardReducer,
        { case: {}, keys: [], env: [], props: [], resourcePool: [], isLoading: false, printsLoaded: false, isError: false }
    )
 
    const [color, setColor ] = useState('#fff')
    const changeColors = (e) => {
        setColor( getRandomColor() )
    }

    const changeLayout = (e) => {
        setSettings({ ...settings, layout : e.target.value })
    }
    const setKeyPrintMaps = ( loadedTextures ) => {
        //set key print maps in resources.keys
        dispatchKeyboard({ type: 'KEYBOARD_LOADED_PRINT_MAPS', payload: loadedTextures } );
    }
    

    //USE MEMO
    const loadKeyResources = async ( keys ) => {
        const resourcePool = keyboard.resourcePool

        for ( const i in keys ) {
            const key = keys[i]

            //model
            if ( isInResourcePool(key.model, resourcePool) ) {
                key.model = getFromResourcePool( key.model.path, resourcePool );
            } else {
                const model =  { path: key.model.path, resource: await getGeometry(key.model.path) }
                key.model = model
                resourcePool.push( model )
                dispatchKeyboard({ type: 'ADD_RESOURCE_TO_RESOURCE_POOL', payload: model }) 
            }

            // //material textures
            for ( const j in key.textures ) {
                const texture = key.textures[j]
                if ( isInResourcePool( texture, resourcePool ) ) {
                    texture.resource = getFromResourcePool( texture.path, resourcePool ).resource
                } else { 
                    texture.resource = await loadTexture( texture.path )
                    const texture_resource = { path : texture.path, resource : texture.resource }
                    resourcePool.push(texture_resource)
                    dispatchKeyboard({ type: 'ADD_RESOURCE_TO_RESOURCE_POOL', payload: texture_resource }) 

                }
            }

        }
        return keys
    }   

    //USE MEMO
    const loadResource = async ( caseObj ) => {
        const resourcePool = keyboard.resourcePool
        if ( isInResourcePool( caseObj.model , resourcePool ) ) {
            caseObj.model = getFromResourcePool( caseObj.model.path, resourcePool )
        } else { 
            const model =  { path: caseObj.model.path, resource: await getGeometry(caseObj.model.path) }
            caseObj.model = model
            resourcePool.push( model )
            dispatchKeyboard({ type: 'ADD_RESOURCE_TO_RESOURCE_POOL', payload: model }) 
        }
        return caseObj
    }


    useEffect(() => {


        dispatchKeyboard({ type: 'KEYBOARD_LOAD_INIT'})
        buildSceneObject(settings).then( sceneObj => {           
            loadKeyResources(sceneObj.keys).then( keysWithResources => {
                sceneObj.keys = keysWithResources
                loadResource(sceneObj.case).then( caseWithResources  => {
                    sceneObj.case = caseWithResources
                    loadResource(sceneObj.props[0]).then( aprop => {
                        sceneObj.props[0] = aprop
                        dispatchKeyboard({ type: 'KEYBOARD_LOADED', payload: sceneObj })
                    })
                
                })
            })

        })


        DefaultLoadingManager.onLoad = () => { console.log('resourecs loaded')}
        DefaultLoadingManager.onError = err => console.log(err)
        DefaultLoadingManager.onProgress = ( url, itemsLoaded, itemsTotal ) => {
    
            console.log( 'Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
            if ( itemsLoaded === itemsTotal ) {
                //dispatchResources({type: 'RESOURCES_LOADED'})
            }

        };
    
        
    }, [settings])



    return (
        <div className="App" style={appStyle} >
            { keyboard.isLoading ? <Loader /> : 
                <>
                    <Interface changeLayout={changeLayout} changeColors={changeColors} />
                    <KeyPrinter keys={ keyboard.keys } setKeyPrintMaps={setKeyPrintMaps} color={color} /> 
                    { keyboard.printsLoaded ? <><Scene keyboard={ keyboard } /></> : null }
                </>
            }
        </div>
    )
}

export default App;