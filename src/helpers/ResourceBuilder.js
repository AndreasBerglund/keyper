import { getCaseData, getKeyData, getKeyLayout } from "./dataLoader"
import { getGeometry, getKeys, getMaterialTextures } from "./resourceLoader"
import { useReducer, useEffect } from 'react'

/*
build a keyboard object containing necessary resources and data to build the keyboard
return object like
{
    "case" : {
        "position" : [0,0,0],
        "geometry" : Geometry,
        "textures" : {
            "map" : Texture,
            "normalMap" : Texture
            etc...
        }
    },
    "keys" : [
        {
            "position" : [0,0,0],
            "geometry" : Geometry,
            "textures" : {
                "map" : Texture,
                "normalMap" : Texture
                etc....
            }
        },
         {
            "position" : [0,0,0],
            "geometry" : Geometry,
            "textures" : {
                "map" : Texture,
                "normalMap" : Texture
                etc....
            }
        },
        etc....
    ]
}
*/

const resourceReducer = (state, action) => {
    switch (action.type) {
        case 'CASE_DATA_SET':
            return {
                ...state,
                case: { ...state.case, data: action.payload }
            }
        case 'CASE_MODEL_LOADED':
            return {
                ...state,
                case: { ...state.case, geometry: action.payload }
            }
        case 'CASE_TEXTURES_LOADED':
            return {
                ...state,
                case: { ...state.case, textures: action.payload }
            }
        case 'KEY_MODELS_LOADED':
            return {
                ...state,
                keys: action.payload
            }

        default:
            throw new Error()
    }
}


const ResourceBuilder = ({ settings }) => {


    const [resources, dispatchResources] = useReducer(
        resourceReducer,
        { case: {}, keys: [], scene: [], props: [], loading: '', isLoading: false, isError: false }
    )


    const casedata = getCaseData(settings.case); //could be async
    const keyrowData = getKeyLayout(settings); //could be async
    const keydata =  getKeyData(settings.keys)


    useEffect(() => {
        console.log('resources loaded')

        dispatchResources({ type: 'CASE_DATA_SET', payload: casedata })

        //LOAD CASE DATA, CASE MODEL AND TEXTURES
        getGeometry(`/models/keyboards/cases/${settings.case}/${settings.size}/case.glb`).then(
            res => {
                dispatchResources({ type: 'CASE_MODEL_LOADED', payload: res })
                getMaterialTextures(casedata.material).then(
                    res => {
                        dispatchResources({ type: 'CASE_TEXTURES_LOADED', payload: res })

                        //LOAD KEY DATA, MODEL AND TEXTURES
                        const rows = getKeyLayout(settings);
                        getKeys(rows, settings, casedata, keydata).then(res => {
                            dispatchResources({ type: 'KEY_MODELS_LOADED', payload: res });
                        })

                    }
                ).catch(err => console.log(err))
            }
        ).catch(err => console.log(err))

    }, [settings])


    //Gey keys from layout and design settings and case data ( for positioning keys )
    const getKeys = async (rows, settings, casedata, keydata) => {
        const keys = [];
        let accumulated_height = casedata.rimY
        for (const row of rows) {
            accumulated_height += 1 + casedata.gap
            let accumulated_width = casedata.rimX
            for (const key of row.keys) {
  
                accumulated_width += key.width + casedata.gap
                const thisKey = {
                    'type': key.type,
                    'model': await getGeometry(`/models/keyboards/keys/${settings.keys}/${key.model}.glb`),
                    'position' : {
                        'x' : accumulated_width - key.width,
                        'y' : accumulated_height - 1
                    },
                    'textures' : await getMaterialTextures(keydata.material)
                }
                keys.push(thisKey);
            }
        }
  
        return keys
    }

    return null
}

export default ResourceBuilder