import Key from './Key.js'
import { getPreset, getCaseData,  getKeyLayout, getKeyModelPath, getKeyData, getTexturesByMaterial, getComponentTextures, getSymbolMap } from '../../helpers/dataLoader'

const Keys = ({ keyboard, resources }) => {

    let id = 0;
    const design = getPreset(keyboard.design)
    const rows = getKeyLayout(keyboard)

    const caseData = getCaseData(keyboard.case)

    let accumulated_height = caseData.rimY
    return (
        <group position={[0, 0, caseData.keyZ]} rotation={[2 * 0.0174532925, 0, 0]}>

            {
                rows.map( row => {
                    
                    accumulated_height += 1 + caseData.gap
                    let accumulated_width = caseData.rimX
                    
                    return row.keys.map( key => {
                        accumulated_width += key.width + caseData.gap
                        id++

                        //Get geometry for Key
                        const geometry = resources.models.find(model => {
                            return model.path === getKeyModelPath(keyboard, key)
                        }).model.scene.clone(true)

                        //Textures in resources
                     
                        const texturesToGet = getTexturesByMaterial(getKeyData( keyboard.keys ).material)
                        const textureProps = getComponentTextures(texturesToGet, resources)

                        //Get symbol if any
                        // const solid = getSymbolMap( keyboard, key).solid
                        // const symbol = resources.textures.find( texture => {
                        //     return texture.path === getSymbolMap( keyboard, key ).path
                        // })
                        const solid = null, symbol = null
                        console.log(symbol)


                        return <Key keyboard={keyboard} geometry={geometry} key={id} solid={solid} symbol={symbol} dynamicTexture={ resources.dynTextures } textureProps={textureProps} x={accumulated_width - key.width} y={accumulated_height - 1} />
                    })
                })
            }

        </group>

    )

}
export default Keys