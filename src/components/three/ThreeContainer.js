import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Canvas, useFrame, extend, useThree } from "react-three-fiber";
import { useRef, useEffect, Suspense, useState, useMemo } from 'react';
import { softShadows } from '@react-three/drei'


//Component 
import Keyboard from './Keyboard.js'
import Scene from './Scene.js'

// Extend will make OrbitControls available as a JSX element called orbitControls for us to use.
extend({ OrbitControls });
softShadows({
    frustrum: 3.75, // Frustrum width (default: 3.75)
    size: 0.005, // World size (default: 0.005)
    near: 9.5, // Near plane (default: 9.5)
    samples: 30, // Samples (default: 17)
    rings: 11, // Rings (default: 11)
  })

const ThreeContainer = ({ resources, keyboard }) => {
    const pos = [15, 5, 15]
    return (
        <Canvas shadowMap>
            <axesHelper />
        
            <CameraControls />
            <ambientLight intensity={0.2} />
            <directionalLight castShadow position={pos} angle={0.15} penumbra={2} shadow-mapSize={new THREE.Vector2(2048, 2048)}  />
            <axesHelper position={pos} angle={.15} />
            <pointLight castShadow position={[-15, -10, -10]} shadow-mapSize={new THREE.Vector2(2048 * 5, 2048 * 5)} />

            <Keyboard resources={resources} keyboard={keyboard} />       
            <Scene resources={resources} />

        </Canvas>
    )
}


const CameraControls = ({ target }) => {
    // Get a reference to the Three.js Camera, and the canvas html element.
    // We need these to setup the OrbitControls component.
    // https://threejs.org/docs/#examples/en/controls/OrbitControls
    const {
        camera,
        gl: { domElement },
    } = useThree();
    // Ref to the controls, so that we can update them on every frame using useFrame
    const controls = useRef();
    camera.position.z = 15
    camera.position.x = 10
    camera.position.y = 3
    useFrame((state) => controls.current.update());
    return <orbitControls ref={controls} target={[10, 3, 0]} args={[camera, domElement]}keyPanSpeed={20} minAzimuthAngle={-Math.PI / 2, Math.PI / 2} enableKeys={false} enableRotate={true} />;
};


export default ThreeContainer