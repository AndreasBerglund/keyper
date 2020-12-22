import React, { useRef, useState, useEffect } from 'react'


const Key = ({ model, position, textures }) => {

  const geometry = model.scene.clone(true)
  const [keyPosition, setKeyPosition] = useState([position.x, position.y, 0])

  if (textures['map']) {
    textures['map'].flipY = false;
    textures['map'].flipX = false;
  }
  const clickedKey = (e) => {
    //setColor(getRandomColor())
  }
  // 
  return (
    <mesh castShadow receiveShadow position={keyPosition} onClick={clickedKey} >
      <bufferGeometry attach="geometry" {...geometry.children[0].geometry} />
      <meshPhysicalMaterial
        {...textures}
        metalness={0}
        roughness={0.5}
        reflectivity={1}
        clearcoat={.4}

      />
    </mesh>
  )
}


export default Key