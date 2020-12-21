import React from 'react'

const Interface = ({ changeLayout, changeColors }) => {

    const interFaceStyle = {
        width : '100%',
        height  : '40%',
        position : 'fixed',
        zIndex : 20
    }

    return (
        <div style={interFaceStyle}>
            <button onClick={changeLayout} value='ISO' >ISO</button>
            <button onClick={changeLayout} value='ANSI' >ANSI</button>
            <button onClick={changeColors} value='blue' >blue</button>
        </div>
    )

}

export default Interface