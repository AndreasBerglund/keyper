import layouts from '../data/layouts.json'
import maps from '../data/maps.json'
import keys from '../data/keys.json'
import cases from '../data/cases.json'
import materials from '../data/materials.json'
import environment from '../data/environment.json'

export const getPrintSymbol = ( identifier, settings ) => {
  //get 
} 


export const getEnvironmentData = () => {
  return environment
}

export const getCaseData = ( design ) => {
  return cases[design]
}

export const getKeyLayout = ( settings ) => {
    //return key layout ( position ) for the current keyboard size and layout
    return layouts[settings.size][settings.layout].rows 
}

export const getKeyData = ( design ) => {
  //return keycap model info
  return keys[design]
}

export const getTexturesByMaterial = ( material ) => {
  //Get textures used by a material, return array of type and path to texture
  const base_path = `/textures/materials/${material}`
  return materials[material].map( texture => { return {type:texture, path:`${base_path}/${texture}.jpg`} })
}

export const getSymbolMap = ( keyboard, key ) => {
 return  { path: `textures/symbols/${keyboard.print}/${maps[keyboard.print][key.map].name}.png`, solid : maps[keyboard.print][key.map].solid }
}



export const getComponentTextures = ( texturesToGet, resources ) => {

  const textures = texturesToGet.map(textureObj => {
      return resources.textures.find(texture => texture.path === textureObj.path)
  })

  const textureProps = {}

  textures.forEach(texture => {
      const obj = {}
      textureProps[texture.type] = texture.texture
  })
  return textureProps
}