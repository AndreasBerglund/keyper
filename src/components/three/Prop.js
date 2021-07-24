const Prop = ({data}) => {
    const geometry = data.model.resource.scene.clone(true)
    const meshes = geometry.children[0].children
    return (
        <>
        <primitive castShadow object={data.model.resource.scene} {...data.data} dispose={null} />
            { meshes.map( mesh => { return  <ShadowCaster  data={data.data} geometry={mesh.geometry} />  }) }
        </>
    )
}


const ShadowCaster = ( { data, geometry } ) => {
   return (
       <mesh castShadow  {...data} >
           <bufferGeometry attach="geometry" {...geometry} />
           <shadowMaterial attach="material" />
       </mesh>
   ) 
}

export default Prop
