import { TextureLoader, DefaultLoadingManager } from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { getTexturesByMaterial } from './dataLoader.js'
import { v4 as uuidv4 } from 'uuid';

export const getGeometry = (path) => new Promise((resolve, reject) => {
    const loader = new GLTFLoader();
    let model = undefined
    DefaultLoadingManager.onLoad = () => resolve(model);
    loader.load(path, (gltf) => {
        model = gltf
    })
})

export const getMaterialTextures = (material) => new Promise((resolve, reject) => {
    DefaultLoadingManager.onLoad = () => resolve(textures);
    const loader = new TextureLoader();
    const textures = {}
    const texturePaths = getTexturesByMaterial(material)
    texturePaths.forEach(texturePath => {
        textures[texturePath.type] = loader.load(texturePath.path) 
    })
})


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

// export const getTextures = (keyboard, props, scene) => new Promise((resolve, reject) => {
//     //find all textures in scene object

//     //Return textures in this format
//     // materials : {
//     //  plastic1 : texture
//     //  plastic2 : texture2
//     //  etc...
//     //}

//     //case
//     const materials = [getCaseData(keyboard.case).material]

//     //keys
//     const key_material = getKeyData(keyboard.keys).material
//     materials.indexOf(key_material) === -1 ? materials.push(key_material) : console.log("Material has already been added")

//     //symbols
//     const symbolTextures = getKeysSymbolTextures(keyboard)

//     //environment
//     const floor_material = getEnvironmentData().floor.material
//     materials.indexOf(floor_material) === -1 ? materials.push(floor_material) : console.log("Material has already been added")

//     const texturesToLoad = materials.map(material => {
//         return getTexturesByMaterial(material)
//     })

//     texturesToLoad.push(symbolTextures)

//     const loader = new TextureLoader();
//     DefaultLoadingManager.onLoad = () => resolve(textures);
//     const textures = []


//     texturesToLoad.forEach(
//         material => { 
//             material.forEach(
//                 obj => {
//                     textures.push({
//                         type: obj.type, path: obj.path, texture: loader.load(obj.path)
//                     })
//                 })

//         });


// })



// export const getModels = (keyboard, props, scene) => new Promise((resolve, reject) => {
//     //find all models in scene object
//     //change scene object to include paths to models and textures.

//     //case
//     const modelsToLoad = [`/models/keyboards/cases/${keyboard.case}/${keyboard.size}/case.glb`]

//     //keys
//     getKeyLayout(keyboard).forEach(rows => {
//         rows.keys.forEach(
//             key => {
//                 const path = `/models/keyboards/keys/${keyboard.keys}/${key.model}.glb`
//                 modelsToLoad.indexOf(path) === -1 ? modelsToLoad.push(path) : console.log("Model has already been added")
//             }
//         )
//     }
//     )

//     //props

//     //scene

//     const loader = new GLTFLoader();
//     DefaultLoadingManager.onLoad = () => resolve(models);
//     const models = []
//     modelsToLoad.forEach(filename => loader.load(filename, (gltf) => {
//         models.push({ 'path': filename, 'model': gltf })
//     }));

// })