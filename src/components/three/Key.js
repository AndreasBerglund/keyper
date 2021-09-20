import React, { useRef, useState, useEffect, useContext } from 'react'
import { getRandomColor } from '../../helpers/helpers'


const Key = ({ model, position, textures, key_id }) => {
  
  const geometry = model.resource.scene.clone(true)

  const _textures = {}
  textures.forEach( texture => {
    if ( texture.type === 'map' ) {
      texture.resource.flipX = false
      texture.resource.flipY = false
      texture.resource.needsUpdate = true;
    } 
    _textures[texture.type] = texture.resource
  })


  // const dispatchInterface = useContext(DispatchInterfaceContext);

  const [keyPosition, setKeyPosition] = useState([position.x, position.y, 0])

  const [hovered, setHover] = useState(false)
  const [selected, setSelected] = useState(false)


  const clickedKey = (e) => {
    if ( !selected ) {
      // dispatchInterface({type:"select", payload: key_id});
    } else {
      // dispatchInterface({type:"deselect", payload: key_id});
    }
    setSelected( !selected );
  }
  // 
  return (
    <>
    <mesh castShadow={false} receiveShadow={false} position={keyPosition} onClick={clickedKey}  onPointerOver={e => setHover(true)}
    onPointerOut={e => setHover(false)}>
      <bufferGeometry attach="geometry" {...geometry.children[0].geometry} />
      <meshPhysicalMaterial
        {..._textures}
        // color={getRandomColor()}
        metalness={0}
        roughness={0.15}
        reflectivity={1}
        clearcoat={.4}
      />
    </mesh>
    <mesh position={keyPosition} visible={hovered ? true : false } >
      <bufferGeometry attach="geometry" {...geometry.children[0].geometry} />
      <meshBasicMaterial  color={'#fff'} 
       transparent={true} opacity={.19}
        />
    </mesh>  
    <mesh position={keyPosition} visible={selected ? true : false }>
      <bufferGeometry attach="geometry" {...geometry.children[0].geometry} />
      <meshBasicMaterial color={'#222222'} flatShading={true} />
    </mesh>  
    
    
    </>

  )
}


export default Key