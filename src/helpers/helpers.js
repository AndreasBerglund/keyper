


export const getRandomColor = () => {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 3; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    //console.log(color)
    //color = "#356497"
    return color;
}


