//Components
import Case from './Case.js'
import Key from './Key.js'


const Keyboard = ({ caseProp , keysProp }) => {
    let key_id = 0;
    return (
        <>
            <Case geometry={caseProp.geometry} textures={caseProp.textures} />
            <group position={[0, 0, caseProp.data.keyZ]} rotation={[caseProp.data.angle, 0, 0]}>
                {
                 
                    keysProp.map( keys => {
                        key_id++
                        return <Key key={key_id} {...keys} /> //model, position, textures
                    })
                }
            </group>
        </>
    )
}
export default Keyboard