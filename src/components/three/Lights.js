import * as THREE from "three";

const Lights = () => {
  //amb light
  //point lights
  const p1 = {
    power: 400,
    pos: [15, 5, 25],
    int: 0.23,
  };
  const p2 = {
    power: 800,
    pos: [-35, 5, 25],
    int: 0.1,
  };
  const p3  = {
    power : 1,
    pos: [-20,0,20],
    int: .2
  }

  const shadowMapSize = new THREE.Vector2(4096 , 4096 );

  return (
    <>
      {/* <ambientLight intensity={0.45} /> */}

      <pointLight castShadow={false} position={p2.pos} power={p2.power} />
      <pointLight castShadow={false} position={p1.pos} power={p1.power}   />

      <axesHelper position={p3.pos} angle={0.15} />
      <directionalLight castShadow={true} intensity={p3.int} position={p3.pos}   shadow-mapSize={shadowMapSize}  />

      {/* <axesHelper position={p1.pos} angle={0.15} /> */}
      {/* <pointLight castShadow={true} position={p1.pos} intensity={p1.int} shadow-mapSize={shadowMapSize} /> */}

      {/* <axesHelper position={p2.pos} angle={0.15} /> */}
      {/* <pointLight castShadow position={p2.pos} intensity={p2.int} shadow-mapSize={shadowMapSize} /> */}
    </>
  );
};

export default Lights;
