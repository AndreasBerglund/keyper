import { useRef, useEffect, useState } from 'react'
import { CanvasTexture } from 'three'
import { getRandomColor } from './../helpers/helpers'

const KeyPrint = ({ keyData, setTextureLoaded, color }) => {

    const canvasStyle = {
        position: 'fixed',
        zIndex: 0,
        right: 0,
        top: 0,
        backgroundColor : 'blue',
        display : 'none'
    }
    
    const canvas = useRef(null)

    const [canvasTexture, setCanvasTexture] = useState( null )
    
    useEffect(() => {
        const texture = new CanvasTexture(canvas.current)
        setTextureLoaded(keyData.key_id, texture)
        setCanvasTexture(texture)
    }, [])

    useEffect(() => {
        if ( canvasTexture ) {
            const ctx = canvas.current.getContext('2d')
            ctx.canvas.width = 1024;
            ctx.canvas.height = 1024;
            ctx.fillStyle = color//getRandomColor();
            ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            ctx.font = '70px Roboto';
            ctx.textAlign = 'center'
            ctx.fillStyle = getRandomColor()
            ctx.fillText(canvasTexture.uuid, ctx.canvas.width/2, ctx.canvas.height/2.5)
        }
    })

    
    return(
        <canvas ref={canvas} style={canvasStyle}></canvas>
    )
} 

const KeyPrinter = ({ keys, setKeyPrintMaps, color }) => {
   
    const [loadedTextures, setLoadedTextures] = useState([])

    const setTextureLoaded = ( id, texture ) => {
        if ( loadedTextures.filter( prevLoadedTexture => prevLoadedTexture.id === id ).length === 0 ) {
            setLoadedTextures( prevLoadedTextures => [...prevLoadedTextures, { id, texture }] )
        }
    }
   
   
    useEffect(() => {
        if ( loadedTextures.length === keys.length ) {
            setKeyPrintMaps( loadedTextures )
        }
    }, [loadedTextures, color])

    return (
        <>
        {
            keys.map( key => <KeyPrint key={ key.key_id } keyData={ key } setTextureLoaded={setTextureLoaded} color={color} />  )
        }
        </>
    )
    

}

export default KeyPrinter