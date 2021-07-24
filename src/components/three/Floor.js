import { RepeatWrapping } from 'three'
 
const Floor = ({floor}) => {
  
    const textures = {}
    floor.textures.forEach( texture => {
      if ( texture.type === 'map' ) {
        texture.resource.wrapS = RepeatWrapping
        texture.resource.wrapT = RepeatWrapping
        texture.resource.repeat.set(3,3)
      } 
      textures[texture.type] = texture.resource
    })
  

    return (
        <mesh receiveShadow rotation={[0,0,90*0.0174532925]}>
            <planeBufferGeometry args={[40, 120]} />
            <meshStandardMaterial attach="material" map={textures['map']} roughness={.82} />
        </mesh>
    )

}

export default Floor