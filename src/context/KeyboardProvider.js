import React, { useEffect, useContext, createContext, useReducer } from 'react'
import { buildKeyboardObject, buildSceneObject, loadModels, loadTextures } from '../helpers/resourceLoader';
import { StateSettingsContext } from './SettingsProvider';

export const DispatchKeyboardContext = createContext();
export const StateKeyboardContext = createContext();

const initialState = {
    //    env: [], 
    //    props: [], 
    //    resourcePool: [], 
    //    printsLoaded: false, 
    //    isError: false
    case: {},
    keys: [],
    isLoading: false,
    modelsLoaded : false,
    texturesLoaded : false,
    floor: {},
    resources: {
        models: [],
        textures: []
    },

}

const reducer = (state, action) => {
    switch (action.type) {
        case 'init': {
            return {
                ...state,
                isLoading: true
            }
        }
        case 'set_key_and_case_objects': {
            const { keyboardObject, sceneObject } = action.payload; 
            return {
                ...state,
                ...keyboardObject,
                ...sceneObject
            }
        }
        case 'set_models' : {
            const models = action.payload;
            console.log('models loaded');
            return {
                ...state,
                modelsLoaded : true,
                resources : { ...state.resources, models : models }
            }
        }
        case 'set_textures' : {
            const textures = action.payload;
            console.log('textures loaded');
            return {
                ...state,
                texturesLoaded: true,
                resources : { ...state.resources, textures : textures }
            }
        }

        default: {
            return {
                ...state
            }
        }
    }
}

const KeyboardProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const settings = useContext(StateSettingsContext);

    useEffect(() => {

        const mainLoader = async() => {
            dispatch({type: "init"});
            //build the resource object from settings
            const keyboardObject = await buildKeyboardObject(settings);
            const sceneObject = await buildSceneObject(settings);

            dispatch({type: "set_key_and_case_objects", payload: { keyboardObject, sceneObject} });
            
            //load models
            const models = await loadModels({ ...keyboardObject, ...sceneObject});
            dispatch({type: "set_models", payload: models });
    
            //load textures
            const textures = await loadTextures({ ...keyboardObject, ...sceneObject});
            dispatch({type:"set_textures", payload: textures});
        
        }

        if (Object.keys(settings).length > 0) {
            mainLoader()
        }

    }, [settings])

    return (
        <DispatchKeyboardContext.Provider value={dispatch} >
            <StateKeyboardContext.Provider value={state} >
                {children}
            </StateKeyboardContext.Provider>
        </DispatchKeyboardContext.Provider>
    )
}

export default KeyboardProvider
