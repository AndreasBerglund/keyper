import { RepeatWrapping } from 'three'
import { getTexturesByMaterial, getComponentTextures, getEnvironmentData } from '../../helpers/dataLoader'
 
const Scene = ({resources}) => {
  
    //Textures in resources
    const texturesToGet = getTexturesByMaterial(getEnvironmentData().floor.material)
    const textureProps = getComponentTextures(texturesToGet, resources)

    for(const texture in textureProps ) {
        textureProps[texture].wrapS = RepeatWrapping
        textureProps[texture].wrapT = RepeatWrapping
        textureProps[texture].repeat.set(3, 3)
    }

    return (
        <mesh receiveShadow rotation={[0,0,90*0.0174532925]}>
            <planeBufferGeometry args={[40, 120]} />
            <meshStandardMaterial attach="material" {...textureProps} roughness={1} />
        </mesh>
    )

}

export default Scene