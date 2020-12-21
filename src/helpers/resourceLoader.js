import { TextureLoader, DefaultLoadingManager } from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { getKeyLayout, getCaseData, getKeyData, getTexturesByMaterial, getEnvironmentData, getKeysSymbolTextures } from './dataLoader.js'


export const getGeometry = ( path ) => new Promise( (resolve, reject) => {
    const loader = new GLTFLoader();
    let model = undefined
    DefaultLoadingManager.onLoad = () => resolve(model);
    loader.load( path, ( gltf ) => {
        model = gltf
    })
})

export const getMaterialTextures = ( material ) => new Promise( (resolve, reject) => {
    const loader = new TextureLoader();
    DefaultLoadingManager.onLoad = () => resolve(textures);
    const textures = []
    const texturePaths = getTexturesByMaterial( material )
    texturePaths.forEach( texturePath => {
        textures.push(
            { type: texturePath.type, texture: loader.load( texturePath.path ) }
        )
    })    
})

export const getTextures = (keyboard, props, scene) => new Promise((resolve, reject) => {
    //find all textures in scene object

    //Return textures in this format
    // materials : {
    //  plastic1 : texture
    //  plastic2 : texture2
    //  etc...
    //}

    //case
    const materials = [getCaseData(keyboard.case).material]

    //keys
    const key_material = getKeyData(keyboard.keys).material
    materials.indexOf(key_material) === -1 ? materials.push(key_material) : console.log("Material has already been added")

    //symbols
    const symbolTextures = getKeysSymbolTextures(keyboard)
 
    //environment
    const floor_material = getEnvironmentData().floor.material
    materials.indexOf(floor_material) === -1 ? materials.push(floor_material) : console.log("Material has already been added")

    const texturesToLoad = materials.map(material => {
        return getTexturesByMaterial(material)
    })
 
    texturesToLoad.push(symbolTextures)
 
    const loader = new TextureLoader();
    DefaultLoadingManager.onLoad = () => resolve(textures);
    const textures = []

 
    texturesToLoad.forEach(
        material => { 
            material.forEach(
                obj => {
                    textures.push({
                        type: obj.type, path: obj.path, texture: loader.load(obj.path)
                    })
                })

        });


})



export const getModels = (keyboard, props, scene) => new Promise((resolve, reject) => {
    //find all models in scene object
    //change scene object to include paths to models and textures.

    //case
    const modelsToLoad = [`/models/keyboards/cases/${keyboard.case}/${keyboard.size}/case.glb`]

    //keys
    getKeyLayout(keyboard).forEach(rows => {
        rows.keys.forEach(
            key => {
                const path = `/models/keyboards/keys/${keyboard.keys}/${key.model}.glb`
                modelsToLoad.indexOf(path) === -1 ? modelsToLoad.push(path) : console.log("Model has already been added")
            }
        )
    }
    )

    //props

    //scene

    const loader = new GLTFLoader();
    DefaultLoadingManager.onLoad = () => resolve(models);
    const models = []
    modelsToLoad.forEach(filename => loader.load(filename, (gltf) => {
        models.push({ 'path': filename, 'model': gltf })
    }));

})