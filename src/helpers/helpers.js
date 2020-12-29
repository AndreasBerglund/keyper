export const getRandomColor = () => {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    //console.log(color)
    //color = "#356497"
    return color;
}


// export const getComponentTextures = ( texturesToGet, resources ) => {

//     const textures = texturesToGet.map(textureObj => {
//         return resources.textures.find(texture => texture.path === textureObj.path)
//     })
  
//     const textureProps = {}
  
//     textures.forEach(texture => {
//         const obj = {}
//         textureProps[texture.type] = texture.texture
//     })
//     return textureProps
//   }