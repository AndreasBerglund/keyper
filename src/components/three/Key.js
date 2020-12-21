import React, { useRef, useState, useEffect } from 'react'

const Key = ({ x, y, symbol, solid, geometry, textureProps, dynamicTexture }) => {

    const [position, setPosition] = useState([x, y, 0])
    const [color, setColor] = useState(getRandomColor())

    let map

    if(dynamicTexture){
      map = dynamicTexture
    }
  
    if(symbol){
       map = symbol.texture
    }

    map.flipY = false
    map.flipX = false

    const clickedKey = (e) => {
      setColor(getRandomColor())
    }  
 
    return (
      <mesh castShadow receiveShadow position={position} onClick={clickedKey} >
        <bufferGeometry attach="geometry" { ...geometry.children[0].geometry }  />
        <meshPhysicalMaterial 

        // map={symbol ? symbol.texture : null}

        // color={
        //   !solid ? color : null  //color if texture is transparent with color
        // } 
        map={map}

        {...textureProps}
        metalness={0}
        roughness={0.8}
        reflectivity={1}
        clearcoat={.4}
        
        />
      </mesh>
    )
    
}

export default Key

const getRandomColor = () => {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    //console.log(color)
    //color = "#356497"
    return color;
  }


