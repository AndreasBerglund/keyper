import { RepeatWrapping } from 'three'
 
const Env = ({resources}) => {
  
    const textures = resources.textures

    for(const texture in textures ) {
        textures[texture].wrapS = RepeatWrapping
        textures[texture].wrapT = RepeatWrapping
        textures[texture].repeat.set(3, 3)
        textures[texture].anisotropy = 1000
    }

    return (
        <mesh receiveShadow rotation={[0,0,90*0.0174532925]}>
            <planeBufferGeometry args={[40, 120]} />
            <meshStandardMaterial attach="material" map={textures['map']} roughness={.82} />
        </mesh>
    )

}

export default Env