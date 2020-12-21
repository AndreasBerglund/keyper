import { useRef, useEffect, useState } from 'react'
import { CanvasTexture, Texture } from 'three'


const DynamicTextureLoader = ({afterDynamicTexturesLoaded}) => {

    const canvas = useRef(null)
    const [color, setColor] = useState('green')
    const [symbol, setSymbol] = useState('I')

    const canvasStyle = {
       position: 'fixed',
       zIndex: 3,
       right: 0,
       top: 0
    }

    const changeColor = () => {
        setColor(getRandomColor())   
    }

    const changeSymbol = (e) => {
        setSymbol(e.target.value)
        //setSymbol('⇧ shift')
    }

    useEffect(() => {
        const ctx = canvas.current.getContext('2d')
        ctx.canvas.width = 1024;
        ctx.canvas.height = 1024;
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.font = '70px Roboto';
        ctx.textAlign = 'center'
        ctx.fillStyle = 'white'
        ctx.fillText(symbol, ctx.canvas.width/2, ctx.canvas.height/2.5)
        const texture = new CanvasTexture(canvas.current)
        afterDynamicTexturesLoaded(texture)
    }, [color, symbol])


    return (
        <>
            <canvas ref={canvas} style={canvasStyle}></canvas>
            <button onClick={changeColor} >Change color</button>
            <input type={'text'} onChange={changeSymbol} maxLength={13}/>
        </>
    )
}

export default DynamicTextureLoader

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
