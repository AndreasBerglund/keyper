const Case = ({ geometry, textures, rotation }) => {
    //Case component included in keyboard
    return (
        <mesh receiveShadow castShadow rotation={rotation}>
            <bufferGeometry attach="geometry" {...geometry.scene.children[0].geometry} position={[0, 0, 0]} />
            <meshStandardMaterial attach="material"  {...textures} />
        </mesh>
    )
}
export default Case