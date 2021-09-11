import React from 'react'

const Interface = ({ changeLayout, changeColors }) => {

    const interFaceStyle = {
        width : '100%',
        height  : '40%',
        position : 'fixed',
        zIndex : 1,
        margin: '20px'
    }

    return (
        <div style={interFaceStyle}>
            <h1>Tasty keys</h1><p><small>v.0.0.1</small></p>
            <button onClick={changeLayout} value='ISO' >ISO</button>
            <button onClick={changeLayout} value='ANSI' >ANSI</button>
            <button onClick={changeColors} value='blue' >blue</button>
        </div>
    )

}

export default Interface