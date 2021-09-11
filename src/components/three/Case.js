const Case = ({ geometry, textures, rotation }) => {
    //Case component included in keyboard
    const w = 15.9, h = 5.35, x = w / 2, y = h / 2, z = .5;

    return (
        <>
            <mesh position={[x, y + .6, .5]} rotation={[0, 0, .03]}>
                <planeBufferGeometry attach="geometry" args={[w, h]} />
                <meshBasicMaterial
                    attach="material"
                    color="black"
                    opacity={0.95}
                    transparent
                />
            </mesh>
            <mesh castShadow={true} rotation={rotation}>
                <bufferGeometry attach="geometry" {...geometry.scene.children[0].geometry} position={[0, 0, 0]} />
                <meshStandardMaterial attach="material"  {...textures} />
            </mesh>
        </>
    )
}
export default Case