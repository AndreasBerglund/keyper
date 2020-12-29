import { TextureLoader, DefaultLoadingManager } from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { v4 as uuidv4 } from 'uuid';

import layouts from '../data/layouts.json'
import maps from '../data/maps.json'
import keys from '../data/keys.json'
import cases from '../data/cases.json'
import materials from '../data/materials.json'
import environment from '../data/environment.json'


//BUILD DATA FROM RESOURCES
const getCaseData = ( design ) => {
    return cases[design]
}
const getKeyLayout = ( settings ) => {
    //return key layout ( position ) for the current keyboard size and layout
    return layouts[settings.size][settings.layout].rows 
}

const getKeyData = ( design ) => {
    return keys[design]
}

const getTexturesByMaterial = ( material ) => {
    //Get textures used by a material, return array of type and path to texture
    const base_path = `/textures/materials/${material}`
    return materials[material].map( texture => { return {type:texture, path:`${base_path}/${texture}.jpg`, resource: null } })
}
  
//Builds the scene object used in resourcesReducer for displaying the threejs models. No textures or models loaded here.
export const buildSceneObject = ( settings ) => new Promise( (resolve, reject) => {
    
    const casedata = getCaseData( settings.case )
    const keydata = getKeyData( settings.keys )
    const textures = getTexturesByMaterial( keydata.material )
    const keys = []
    const rows = getKeyLayout( settings )
    let accumulated_height = casedata.rimY
    for (const row of rows) {
        accumulated_height += 1 + casedata.gap
        let accumulated_width = casedata.rimX
        for (const key of row.keys) {
            accumulated_width += key.width + casedata.gap
            const key_id = uuidv4()
            const thisKey = {
                'key_id': key_id,
                'type': key.type,
                'model': { path: `/models/keyboards/keys/${settings.keys}/${key.model}.glb`, resource: null },
                'position': {
                    'x': accumulated_width - key.width,
                    'y': accumulated_height - 1
                },
                'textures': textures
            }
            keys.push(thisKey);
        }
    }

    const sceneObj = {
        case : { data: casedata, model: { path : `/models/keyboards/cases/${settings.case}/${settings.size}/case.glb`, resource : null }, textures: null },
        keys : keys,
        env : [],
        props : [
            {
                data: {position: [-10,20,0], scale: [50,50,50], rotation: [3.14/2, 0,0] }, model: { path: `/models/props/plant.gltf`, resource: null},  textures: null 
            }
        ]
    }

    resolve(sceneObj)
})



//LOADING MODELS
export const getGeometry = (path) => new Promise((resolve) => {
    const loader = new GLTFLoader();
    let model = undefined
    loader.load(path, (gltf) => {
        model = gltf
        resolve(model)
    })
})

//LOADING TEXTURES
export const getMaterialTextures = async ( material ) => {
    const texturePaths = getTexturesByMaterial( material )
    const textures = {}
    for (const i in texturePaths ) {
        const texturePath = texturePaths[i]
        textures[texturePath.type] = await loadTexture( texturePath.path )
    }
    return textures
}

export const loadTexture = ( path_to_texture ) => new Promise( (resolve ) => {
    const loader = new TextureLoader()
    let texture = undefined
    loader.load( path_to_texture , res => {
        texture = res
        resolve(texture)
    } )
})


export const isInResourcePool = ( resource, resourcePool ) => {
    if ( resourcePool.some( pooled_resource => pooled_resource.path === resource.path ) ) {
        return true
    } else {
        return false
    }
}   

export const getFromResourcePool = ( resource_path, resourcePool ) => {
    return resourcePool.find( pooled_resource => pooled_resource.path === resource_path )        
}



//Gey keys from layout and design settings and case data ( for positioning keys )
export const getKeys = async (rows, settings, casedata, keydata) => {
    const keys = [];
    const modelsLoaded = {};
    const texturesLoaded = {};
    let accumulated_height = casedata.rimY
    for (const row of rows) {
        accumulated_height += 1 + casedata.gap
        let accumulated_width = casedata.rimX
        for (const key of row.keys) {
            const key_id = uuidv4()
            const path = `/models/keyboards/keys/${settings.keys}/${key.model}.glb`
            let model = undefined
            if ( modelsLoaded[path]) {
                model = modelsLoaded[path]
            } else {
                model = await getGeometry(`/models/keyboards/keys/${settings.keys}/${key.model}.glb`)
                modelsLoaded[path] = model
            }
            accumulated_width += key.width + casedata.gap
            
            const material = keydata.material;
            let textures = {}
            if ( texturesLoaded[material] ) {
                textures = Object.assign(textures, texturesLoaded[material] )
            } else {
                textures = await getMaterialTextures(keydata.material)
                texturesLoaded[material] = textures
            }
            
            const thisKey = {
                'key_id': key_id,
                'type': key.type,
                'model': model,
                'position': {
                    'x': accumulated_width - key.width,
                    'y': accumulated_height - 1
                },
                'textures': textures
            }
            keys.push(thisKey);
        }
    }

    return keys
}

export const getCase = async (settings, casedata) => {
    const caseObj = {
        data: casedata,
        geometry: await getGeometry(`/models/keyboards/cases/${settings.case}/${settings.size}/case.glb`),
        textures: await getMaterialTextures(casedata.material)
    }
    return caseObj
}

export const getEnv = async (envdata) => {
    const envObj = {
        textures: await getMaterialTextures(envdata.floor.material)
    }
    return envObj
}
