import React from 'react'

const Loader = () => {

    const loaderStyle = {
        width: '100%',
        height: '100%',
        background: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems : 'center',
        fontSize: '2rem',
        zIndex: 1000,
        position: 'fixed'
    }

    return (
        <div style={loaderStyle}>
            Loading...
        </div>
    )
}

export default Loader