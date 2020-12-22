//Components
import Case from './Case.js'
import Key from './Key.js'


const Keyboard = ({ caseProp , keysProp }) => {

    return (
        <>
            <Case geometry={caseProp.geometry} textures={caseProp.textures} />
            <group position={[0, 0, caseProp.data.keyZ]} rotation={[caseProp.data.angle, 0, 0]}>
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