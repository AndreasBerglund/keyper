import React, { useState,useEffect, useContext } from 'react'
import { DispatchKeyboardContext, StateKeyboardContext } from '../context/KeyboardProvider'

const interFaceStyle = {
    width: '200px',
    height: '100%',
    position: 'fixed',
    zIndex: 1,
    padding: '20px',
    fontFamily: 'BillionDreams',
    background: '#fff',
    right: 0,
    top: 0,
    boxShadow: "0px 4px 4px rgba(0,0,0,.3)"
}

const logoStyle = {
    pointerEvents: "none",
    textAlign: "left",
    position: 'fixed',
    height: "80px",
    width: 'calc(100% - 200px)',
    left: 90,
    top: 0,

    zIndex: 1,
    textShadow: "0px 4px 14px rgba(0,0,0,.13)"
}

const Interface = ({ changeLayout, changeColors }) => {
    const { keys } = useContext(StateKeyboardContext);
    const dispatchKeyboard = useContext(DispatchKeyboardContext);
    const [selectedKeys, setSelectedKeys] = useState([])

    useEffect(() => {
        setSelectedKeys( keys.filter( key=>key.state.selected))
    }, [keys])

    const selectKeys = () => {
        
    }

    const changeColor = (e) => {
        dispatchKeyboard({type:"set_color", payload: e.target.value})
    }

    return (
        <>
            <div style={logoStyle}>
                <h1 style={{ marginBottom: 0 }}>Tasty caps</h1>
                <p style={{ color: 'white' }}><small>v.0.0.1</small></p>
            </div>
            <div style={interFaceStyle}>
                {/* <button onClick={changeLayout} value='ISO' >ISO</button>
                <button onClick={changeLayout} value='ANSI' >ANSI</button>
                <button onClick={changeColors} value='blue' >blue</button> */}
                <p>Select keys</p>
                <button onClick={selectKeys} value='modifiers' >Modifiers</button>
                <button onClick={selectKeys} value='alphanumeric' >Alphanumeric</button>
                <button onClick={selectKeys} value='all' >All keys</button>


                {selectedKeys.length > 0 &&
                    <div>
                        <p>Change color</p>
                       <select onChange={(e)=>changeColor(e)}>
                           <option disabled selected>select a color</option>
                           <option value="#89edd9">Turquoise</option>
                           <option value="#eb422d">Red</option>
                           <option value="#f86924">Orange</option>
                           <option value="#e8cc55">Yellow</option>
                           <option value="#7a4f30">Brown</option>
                       </select>
                    </div>
                }

            </div>
        </>
    )

}

export default Interface