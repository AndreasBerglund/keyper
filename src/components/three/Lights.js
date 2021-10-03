import * as THREE from 'three';

const Lights = () => {

    //amb light
    const dirlight = {
        pos : [30,40,10],
        int : .125
    }

    //point lights
    const p1 = {
        pos : [15,5,25],
        int : .23
    }
    const p2 = {
        pos : [-25,5,25],
        int : .1
    }


    const shadowMapSize = new THREE.Vector2( 2048, 2048)

    return (
        <>
            <ambientLight intensity={0.1} />
            
            {/* <axesHelper position={dirlight.pos} angle={.15} /> */}
            <directionalLight castShadow={false} intensity={dirlight.int} position={dirlight.pos} angle={0.15}  shadow-mapSize={shadowMapSize}  />
            
            {/* <axesHelper position={p1.pos} angle={.15} /> */}
            <pointLight castShadow={true} position={p1.pos} intensity={p1.int} shadow-mapSize={shadowMapSize} />
            
            {/* <axesHelper position={p2.pos} angle={.15} />  */}
            <pointLight castShadow position={p2.pos} intensity={p2.int} shadow-mapSize={shadowMapSize} />
        </>
    )
}

export default Lights