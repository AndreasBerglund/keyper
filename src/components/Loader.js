import React from 'react';
import Spinner from 'react-spinner-material';

const Loader = ({zIndex, ready}) => {
    
    const loaderStyle = {
        width: 'calc(100% - 230px)',
        height: '100%',
        background: 'black',
        display: 'flex',
        justifyContent: 'center',
        alignItems : 'center',
        fontSize: '2rem',
        zIndex: zIndex,
        position: 'fixed',
        color: 'black',
        transition: 'all 0.4s'
    }

    return (
        <div style={loaderStyle}>
            <Spinner radius={60} color={"#ccc"} stroke={5} visible={ready} />
            {/* Loading... */}
        </div>
    )
}

export default Loader