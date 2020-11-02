import React from 'react';

const withRainbowFrame = colors => Component => props => (() => { //HOC, последняя функция описывается и сразу вызывается

    let colorsArray = [...colors];
    let lastElem = colorsArray.length - 1;

    let recursion = (index) => <div style={{border:`solid 7px ${colorsArray[index]}`, padding:'6px 6px', display:'inline-block'}}>{ (index===0)&&<Component {...props}/> || recursion(index-1) }</div>; // ЕСЛИ index===0 (базовое условие), то отрисовать Component, если нет, запускаем рекурсию 

    return recursion(lastElem); // аргумент - последний элемент массива цветов, с него вызов
    
})();
  
export { withRainbowFrame };