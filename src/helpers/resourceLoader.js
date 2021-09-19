// Features for building objects regarding models and textures plus features regarding loading resources.
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { TextureLoader } from 'three'
import { v4 as uuidv4 } from 'uuid';
import layouts from '../data/layouts.json'
//import maps from '../data/maps.json'
import keys from '../data/keys.json'
import cases from '../data/cases.json'
import materials from '../data/materials.json'
import environment from '../data/environment.json'


//Get a json regarding casedata
const getCaseData = (design) => {
    return cases[design]
}

//Get a json regarding keyboard layout.
const getKeyLayout = (settings) => {
    //return key layout ( position ) for the current keyboard size and layout
    return layouts[settings.size][settings.layout].rows
}

//Get a json regarding keycap design
const getKeyData = (design) => {
    return keys[design]
}

//Get textures used by a material, return array of type and path to texture ( defined in materials.json )
export const getTextureObjectsByMaterial = (material) => {
    const base_path = `/textures/materials/${material}`
    return materials[material].map(texture => { return { type: texture, path: `${base_path}/${texture}.png`, resource: null } })
}

//Builds the keyboard object used in keyboardReducer for displaying the threejs models. No textures or models loaded here.
export const buildKeyboardObject = (settings) => new Promise((resolve, reject) => {

    const casedata = getCaseData(settings.case)
    const keydata = getKeyData(settings.keys)
    const textures = getTextureObjectsByMaterial(keydata.material)
    const keys = []
    const rows = getKeyLayout(settings)
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
                'textures': textures,
                'map': key.map
            }
            keys.push(thisKey);
        }
    }

    const sceneObj = {
        case: { data: casedata, model: { path: `/models/keyboards/cases/${settings.case}/${settings.size}/case.glb`, resource: null }, textures: null },
        keys: keys
    }

    resolve(sceneObj)
})

//Scene object {} builder. Returns an object regarding everything but the keyboard. used in sceneReducer
export const buildSceneObject = () => new Promise((resolve, reject) => {
    const sceneObj = {

            floor: {
                textures: getTextureObjectsByMaterial(environment.floor.material)
            },
            props: [
                {
                    data: { 
                        position: [-10, 10, 0], 
                        scale: [50, 50, 50], 
                        rotation: [3.14 / 2, 0, 0] }, 
                        model: { path: `/models/props/plant.gltf`, resource: null }, 
                        textures: null
                }
            ]
    }
    resolve(sceneObj)
})


//check if a resource is in the pool. A resource is an object with a path.
export const isInResourcePool = ( resource, resourcePool ) => {
    if ( resourcePool.some( pooled_resource => pooled_resource.path === resource.path ) ) {
        return true
    } else {
        return false
    }
}   

//get a resource from the pool by resource path.
export const getFromResourcePool = ( resource_path, resourcePool ) => {
    return resourcePool.find( pooled_resource => pooled_resource.path === resource_path )        
}

//Load a gltf model, async function. returns model or undefined.
export const getGeometry = (path) => new Promise((resolve) => {
    const loader = new GLTFLoader();
    let model = undefined
    loader.load(path, (gltf) => {
        model = gltf
        resolve(model)
    })
})

//Async. Return array of textures used in material. Input material name.
export const getMaterialTextures = async ( material ) => {
    const texturePaths = getTextureObjectsByMaterial( material )
    const textures = {}
    for (const i in texturePaths ) {
        const texturePath = texturePaths[i]
        textures[texturePath.type] = await loadTexture( texturePath.path )
    }
    return textures
}

//Async. Loads a texture using TextureLoader. Input path to texture. Returns texture
export const loadTexture = ( path_to_texture ) => new Promise( (resolve ) => {
    const loader = new TextureLoader()
    let texture = undefined
    loader.load( path_to_texture , res => {
        texture = res
        resolve(texture)
    })
})
