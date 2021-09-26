import { useRef, useContext, useEffect, useState } from 'react';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Canvas, useFrame, extend, useThree } from "react-three-fiber";
import { useContextBridge } from '@react-three/drei'

//context for bridge
import { DispatchKeyboardContext, StateKeyboardContext } from '../../context/KeyboardProvider';
import { StateApplierContext } from '../../context/ApplierProvider';

//Components
import Lights from './Lights'
import Keyboard from './Keyboard.js'
import Floor from './Floor.js'



// Extend will make OrbitControls available as a JSX element called orbitControls for us to use.
extend({ OrbitControls });
// softShadows({
//     frustrum: 3.75, // Frustrum width (default: 3.75)
//     size: 0.005, // World size (default: 0.005)
//     near: 9.5, // Near plane (default: 9.5)
//     samples: 30, // Samples (default: 17)
//     rings: 11, // Rings (default: 11)
//   })


const styleOut = {
    transition: 'opacity 1s ease-in',
    opacity: 0
}
const styleIn = {
    transition: 'opacity 1s ease-in',
    opacity: 1
}

const Scene = ({ onMounted }) => {
    const [mounted, setMounted] = useState(false)
    useEffect(() => {
        setMounted(true)
        // onMounted();
    }, [])

    const ContextBridge = useContextBridge(StateKeyboardContext, DispatchKeyboardContext, StateApplierContext);
    const { modelsLoaded, texturesLoaded, floor } = useContext(StateKeyboardContext);
    return (
        <Canvas shadowMap style={mounted ? styleIn : styleOut} >
            <ContextBridge>
                {modelsLoaded && texturesLoaded &&
                    <>
                        <axesHelper />
                        <CameraControls />
                        <Lights />
                        <Keyboard />
                        <Floor floor={floor} />
                    </>
                }
            </ContextBridge>
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
    const [pos, setPos] = useState([10, 3, 15])
    camera.position.x = pos[0]
    camera.position.y = pos[1]
    camera.position.z = pos[2]
    useFrame((state) => {
        //console.log(camera.position)
        setPos([camera.position.x, camera.position.y, camera.position.z])
        controls.current.update()
    });
    return <orbitControls ref={controls} target={[10, 3, 0]} args={[camera, domElement]} keyPanSpeed={20} maxPolarAngle={Math.PI / 1.2} minPolarAngle={Math.PI / 3} maxAzimuthAngle={Math.PI / 3} minAzimuthAngle={-Math.PI / 3} enableKeys={false} enableRotate={true} />;
};


export default Scene