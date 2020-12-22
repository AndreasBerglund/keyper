import { useRef, useEffect, useState } from 'react'
import { CanvasTexture } from 'three'


const getRandomColor = () => {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    //console.log(color)
    //color = "#356497"
    return color;
  }


const KeyPrint = ({ keyData, setTextureLoaded }) => {

    const canvasStyle = {
        position: 'fixed',
        zIndex: 400,
        right: 0,
        top: 0,
        backgroundColor : 'blue'
    }
    
    const canvas = useRef(null)
    
    useEffect(() => {
        const ctx = canvas.current.getContext('2d')
        ctx.canvas.width = 1024;
        ctx.canvas.height = 1024;
        ctx.fillStyle = getRandomColor();
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.font = '70px Roboto';
        ctx.textAlign = 'center'
        ctx.fillStyle = getRandomColor()
        ctx.fillText('M', ctx.canvas.width/2, ctx.canvas.height/2.5)
        const texture = new CanvasTexture(canvas.current)
        setTextureLoaded(keyData.key_id, texture)

    }, [])
    
    return(
        <canvas ref={canvas} style={canvasStyle}></canvas>
    )
} 

const KeyPrinter = ({ keys, setKeyPrintMaps }) => {
   
    const [loadedTextures, setLoadedTextures] = useState([])
    const [numKeys, setNumKeys] = useState( keys.length )

    const setTextureLoaded = ( id, texture ) => {
        setLoadedTextures( loadedTextures.push({ id, texture }) )
    }
   
    useEffect(() => {
        
        if ( loadedTextures.length === numKeys ) {
            setKeyPrintMaps( loadedTextures )
        }
        
    }, [loadedTextures])

    return (
        <>
        {
            keys.map( key => <KeyPrint key={ key.key_id } keyData={ key } setTextureLoaded={setTextureLoaded}/>  )
        }
        </>
    )
    

}

export default KeyPrinter