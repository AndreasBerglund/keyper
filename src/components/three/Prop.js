const Prop = ({data}) => {
    const geometry = data.model.resource.scene.clone(true)
    return (
        <primitive object={data.model.resource.scene} {...data.data} dispose={null} />
    )
}
export default Prop
