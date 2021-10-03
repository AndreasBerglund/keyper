import React, { useContext } from 'react';
import { RepeatWrapping } from 'three'
import { StateKeyboardContext } from '../../context/KeyboardProvider'

const Floor = ({ floor }) => {

  const { resources } = useContext(StateKeyboardContext);
  const textures = {}
  floor.textures.forEach(texture => {
    const resource = resources.textures[texture.textureKey];
    // if (texture.type === 'map') {
    if (texture.type) {
      resource.wrapS = RepeatWrapping
      resource.wrapT = RepeatWrapping
      resource.repeat.set(4, 4);
      resource.anisotropy = 4;
      // resource.repeat.set( 10, 24 );
    }
    textures[texture.type] = resource
  })

  return (
    <mesh receiveShadow rotation={[0, 0, 90 * 0.0174532925]}>
      <planeBufferGeometry args={[40, 120]} />
      <meshStandardMaterial attach="material"  
      map={textures['map']} 
      {...textures } 
      roughness={150}/>
    </mesh>
  )

}

export default Floor