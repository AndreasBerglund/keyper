import { useState, useEffect, useReducer } from 'react'
import './App.css';
import { buildSceneObject, buildKeyboardObject, isInResourcePool, getFromResourcePool, getGeometry, loadTexture } from "./helpers/resourceLoader"
import initialSettings from './data/settings.json'

import Scene from './components/three/Scene'
import Loader from './components/Loader'
import Interface from './components/Interface'
import KeyPrinter from './components/KeyPrinter'
import { DefaultLoadingManager } from 'three'
import { getRandomColor } from './helpers/helpers'

const sceneReducer = (state, action) => {
    switch (action.type) {
        case 'SCENE_LOAD_INIT':
            return {
                ...state,
                isLoading: true
            }
        case 'SCENE_LOADED':
            return {
                ...state,
                isLoading: false,
                ...action.payload
            }
        default:
            throw new Error()
    }
}

const keyboardReducer = (state, action) => {
    switch (action.type) {

        case 'KEYBOARD_LOAD_INIT':
            return {
                ...state,
                printsLoaded: false,
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
        case 'KEYBOARD_LOADED_PRINT_MAPS':
            const newKeys = [...state.keys];
            newKeys.forEach(key => {
                const resourceIndex = action.payload.findIndex(x => x.id === key.key_id);
                const printMap = { type: 'map', resource: action.payload[resourceIndex].texture }
                const map = key.textures.find(texture => texture.type === 'map')
                const arr = [...key.textures]
                if (!map) { arr.push(printMap) }
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

    const [scene, dispatchScene] = useReducer(
        sceneReducer,
        { floor: {}, props: {} }
    )

    const [color, setColor] = useState('#fff')
    const changeColors = (e) => {
        setColor(getRandomColor())
    }

    const changeLayout = (e) => {
        setSettings({ ...settings, layout: e.target.value })
    }
    const setKeyPrintMaps = (loadedTextures) => {
        dispatchKeyboard({ type: 'KEYBOARD_LOADED_PRINT_MAPS', payload: loadedTextures });
    }

    //Takes a obj ( resource ) as an argument and returns it populated with a model resource ( gltf ) model { path: '/path_to_resource', resource: null}
    const loadResource = async ( resource ) => {
        const resourcePool = keyboard.resourcePool
        if (isInResourcePool(resource, resourcePool)) {
            resource = getFromResourcePool(resource.path, resourcePool)
        } else {
            const model = { path: resource.path, resource: await getGeometry(resource.path) }
            resource = model
            resourcePool.push(model)
            dispatchKeyboard({ type: 'ADD_RESOURCE_TO_RESOURCE_POOL', payload: model })
        }
        return resource
    }

    //Iterates props and populates with resources
    const loadPropResources = async ( props ) => {
        for ( const i in props ) {
            const prop = props[i]
            prop.model = await loadResource(prop.model)
        }
        return props
    }

    //Takes a keys object and loads models if not in resource pool
    const loadKeyResources = async (keys) => {
        const resourcePool = keyboard.resourcePool

        for (const i in keys) {
            const key = keys[i]

            //model
            if (isInResourcePool(key.model, resourcePool)) {
                key.model = getFromResourcePool(key.model.path, resourcePool);
            } else {
                const model = { path: key.model.path, resource: await getGeometry(key.model.path) }
                key.model = model
                resourcePool.push(model)
                dispatchKeyboard({ type: 'ADD_RESOURCE_TO_RESOURCE_POOL', payload: model })
            }

            //material textures
            for (const j in key.textures) {
                const texture = key.textures[j]
                if (isInResourcePool(texture, resourcePool)) {
                    texture.resource = getFromResourcePool(texture.path, resourcePool).resource
                } else {
                    texture.resource = await loadTexture(texture.path)
                    const texture_resource = { path: texture.path, resource: texture.resource }
                    resourcePool.push(texture_resource)
                    dispatchKeyboard({ type: 'ADD_RESOURCE_TO_RESOURCE_POOL', payload: texture_resource })

                }
            }

        }
        return keys
    }

    //Load textures and add to resource pool
    const loadTextures = async (textures) => {
        const resourcePool = keyboard.resourcePool
        // //material textures
        for (const j in textures) {
            const texture = textures[j]
            if (isInResourcePool(texture, resourcePool)) {
                texture.resource = getFromResourcePool(texture.path, resourcePool).resource
            } else {
                texture.resource = await loadTexture(texture.path)
                const texture_resource = { path: texture.path, resource: texture.resource }
                resourcePool.push(texture_resource)
                dispatchKeyboard({ type: 'ADD_RESOURCE_TO_RESOURCE_POOL', payload: texture_resource })
            }
        }
        return textures
    }

    //Effect for loading the scene.
    useEffect(() => {
        dispatchScene({ type: 'SCENE_LOAD_INIT' })
        //load scene
        buildSceneObject().then(sceneObj => {
            loadTextures( sceneObj.floor.textures ).then( sceneTextures => {
                sceneObj.floor.textures = sceneTextures
                loadPropResources( sceneObj.props ).then ( propsWithResources => {
                    dispatchScene({ type: 'SCENE_LOADED', payload: sceneObj })
                })
            })
        })

        //load props

    }, [])

    //Effect for loading the keyboard.
    useEffect(() => {
        dispatchKeyboard({ type: 'KEYBOARD_LOAD_INIT' })
        buildKeyboardObject(settings).then(keyboardObj => {
            loadKeyResources(keyboardObj.keys).then(keysWithResources => {
                keyboardObj.keys = keysWithResources
                loadResource(keyboardObj.case.model).then( modelWithResource => {
                    keyboardObj.case.model = modelWithResource
                    dispatchKeyboard({ type: 'KEYBOARD_LOADED', payload: keyboardObj })
                })
            })
        })


        DefaultLoadingManager.onLoad = () => { console.log('resourecs loaded') }
        DefaultLoadingManager.onError = err => console.log(err)
        DefaultLoadingManager.onProgress = (url, itemsLoaded, itemsTotal) => {

            console.log('Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.');
            if (itemsLoaded === itemsTotal) {
                //dispatchResources({type: 'RESOURCES_LOADED'})
            }

        };


    }, [settings])


    return (
        <div className="App" style={appStyle} >
            { keyboard.isLoading || scene.isLoading ? <Loader zIndex={1000} /> :
                <>
                    <KeyPrinter keys={keyboard.keys} setKeyPrintMaps={setKeyPrintMaps} color={color} />
                    <Loader zIndex={0} />
                    { keyboard.printsLoaded ? <><Interface changeLayout={changeLayout} changeColors={changeColors} /><Scene scene={scene} keyboard={keyboard} /></> : null }
                </>
            }
        </div>
    )
}

export default App;