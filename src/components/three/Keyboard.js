import React, { useContext } from 'react';
import { StateKeyboardContext } from '../../context/KeyboardProvider.js';

//Components
import Case from './Case.js'
import Key from './Key.js'

const Keyboard = ({ caseProp , keysProp }) => {
    const {case: caseObj } = useContext(StateKeyboardContext);
    console.log(caseObj)
    const rotationZ =.04

    return (
        <>
            <Case geometry={caseProp.model.resource} textures={caseProp.textures} rotation={[0,0,rotationZ]}  />
            <group position={[0, 0, caseObj.data.keyZ]} rotation={[caseObj.data.angle, 0, rotationZ]}>
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