import React, { useRef, useState, useEffect } from 'react'

//const Key = ({ x, y, symbol, solid, geometry, textureProps, dynamicTexture }) => {

  const Key = ({ model, position, textures }) => {

    const geometry = model.scene.clone(true)
    const [keyPosition, setKeyPosition] = useState([position.x, position.y, 0])

    let map

    // if(dynamicTexture){
    //   map = dynamicTexture
    // }
  
    // if(symbol){
    //    map = symbol.texture
    // }

    // map.flipY = false
    // map.flipX = false

    const clickedKey = (e) => {
      //setColor(getRandomColor())
    }  
 
    return (
      <mesh castShadow receiveShadow position={keyPosition} onClick={clickedKey} >
        <bufferGeometry attach="geometry" { ...geometry.children[0].geometry }  />
        <meshPhysicalMaterial 

        // map={symbol ? symbol.texture : null}

        // color={
        //   !solid ? color : null  //color if texture is transparent with color
        // } 
       // map={map}

        {...textures}
        metalness={0}
        roughness={0.8}
        reflectivity={1}
        clearcoat={.4}
        
        />
      </mesh>
    )
    
}

export default Key
