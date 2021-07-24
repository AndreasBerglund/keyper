import React from 'react'

const Loader = ({zIndex}) => {

    const loaderStyle = {
        width: '100%',
        height: '100%',
        background: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems : 'center',
        fontSize: '2rem',
        zIndex: zIndex,
        position: 'fixed',
        color: 'black'
    }

    return (
        <div style={loaderStyle}>
       
            Loading...
        </div>
    )
}

export default Loader