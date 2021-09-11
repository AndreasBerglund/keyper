//Components
import Case from './Case.js'
import Key from './Key.js'

const Keyboard = ({ caseProp , keysProp }) => {
    const rotationZ =.04
    console.log(caseProp)
    return (
        <>
            <Case geometry={caseProp.model.resource} textures={caseProp.textures} rotation={[0,0,rotationZ]} />
            <group position={[0, 0, caseProp.data.keyZ]} rotation={[caseProp.data.angle, 0, rotationZ]}>
                {
                 
                    keysProp.map( key => {
                        return <Key key={key.key_id} {...key} /> //model, position, textures
                    })
                }
            </group>
        </>
    )
}
export default Keyboard