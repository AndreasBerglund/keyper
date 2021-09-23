import React, { useState, useEffect } from 'react';
import Spinner from 'react-spinner-material';
import { useProgress } from '@react-three/drei';

const Loader = ({zIndex, ready}) => {
    const { active, progress, errors, item, loaded, total } = useProgress()
            console.log(progress)
    const loaderStyle = {
        width: 'calc(100% - 230px)',
        height: '100%',
        background: 'black',
        display: 'flex',
        flexDirection: "column",
        justifyContent: 'center',
        alignItems : 'center',
        fontSize: '2rem',
        zIndex: zIndex,
        position: 'fixed',
        color: '#fff',
        transition: 'all 0.4s'
    }

    return (
        <div style={loaderStyle}>
            <Spinner radius={60} color={"#ccc"} stroke={5} visible={ready} />
            <p>{ Math.round(progress) } % loaded</p>

        </div>
    )
}

export default Loader