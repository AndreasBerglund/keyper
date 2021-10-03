import * as THREE from "three";

const Lights = () => {
  //amb light
  const dirlight = {
    pos: [30, 40, 10],
    int: 0.125,
  };

  //point lights
  const p1 = {
    power: 800,
    pos: [55, 5, 25],
    int: 0.23,
  };
  const p2 = {
    power: 800,
    pos: [-55, 5, 25],
    int: 0.1,
  };

  const shadowMapSize = new THREE.Vector2(2048, 2048);

  return (
    <>
      {/* <ambientLight intensity={0.1} /> */}

      <pointLight castShadow position={p2.pos} power={p2.power}  
    //   shadow-mapSize-height={1024}
    //     shadow-mapSize-width={1024}
        />
      <pointLight castShadow position={p1.pos} power={p1.power} shadow-mapSize={shadowMapSize}/>

      <axesHelper position={dirlight.pos} angle={0.15} />
      {/* <directionalLight castShadow={false} intensity={dirlight.int} position={dirlight.pos} angle={0.15}  shadow-mapSize={shadowMapSize}  /> */}

      <axesHelper position={p1.pos} angle={0.15} />
      {/* <pointLight castShadow={true} position={p1.pos} intensity={p1.int} shadow-mapSize={shadowMapSize} /> */}

      <axesHelper position={p2.pos} angle={0.15} />
      {/* <pointLight castShadow position={p2.pos} intensity={p2.int} shadow-mapSize={shadowMapSize} /> */}
    </>
  );
};

export default Lights;
