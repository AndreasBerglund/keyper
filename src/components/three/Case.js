const Case = ({ geometry, textures }) => {
    //Case component included in keyboard
    return (
        <mesh receiveShadow castShadow>
            <bufferGeometry attach="geometry" {...geometry.scene.children[0].geometry} position={[0, 0, 0]} />
            <meshStandardMaterial attach="material"  {...textures} />
        </mesh>
    )
}
export default Case