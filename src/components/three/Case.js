
import { getCaseData, getTexturesByMaterial, getComponentTextures } from '../../helpers/dataLoader.js'

const Case = ({ keyboard, resources }) => {
    //Case component included in keyboard
    
    //3d model in resources
    const geometry = resources.models.find(model => {
        return model.path === `/models/keyboards/cases/${keyboard.case}/${keyboard.size}/case.glb`
    }).model.scene

    //Textures in resources
    const texturesToGet = getTexturesByMaterial( getCaseData( keyboard.case ).material )
    const textureProps = getComponentTextures(texturesToGet, resources)

    const position = [0, 0, 0]

    return (
        <mesh receiveShadow castShadow>
            <bufferGeometry attach="geometry" {...geometry.children[0].geometry} position={position} />
            <meshStandardMaterial attach="material"  {...textureProps} />
        </mesh>
    )
}
export default Case