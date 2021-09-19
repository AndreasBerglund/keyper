import React, { useContext } from 'react'
import { DispatchInterfaceContext, StateInterfaceContext } from '../context/InterfaceProvider'


const Interface = ({ changeLayout, changeColors }) => {

    const { allKeys, selectedKeys } = useContext(StateInterfaceContext);
    const dispatchInterface = useContext(DispatchInterfaceContext);

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

    return (
        <>
            <div style={logoStyle}>
                <h1 style={{ marginBottom: 0 }}>Tasty caps</h1>
                <p style={{ color: 'white' }}><small>v.0.0.1</small></p>
            </div>
            <div style={interFaceStyle}>
                <button onClick={changeLayout} value='ISO' >ISO</button>
                <button onClick={changeLayout} value='ANSI' >ANSI</button>
                <button onClick={changeColors} value='blue' >blue</button>

                <div>
                    {JSON.stringify(allKeys)}
                    {JSON.stringify(selectedKeys)}
                </div>

                {selectedKeys.length > 0 &&
                    <div>
                       <select onChange={ (e)=>{ console.log(e.target.value)}}>
                           <option value="#222">Black</option>
                           <option value="#E2854C">Orange</option>
                       </select>
                    </div>
                }

            </div>
        </>
    )

}

export default Interface