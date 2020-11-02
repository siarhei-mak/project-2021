import React from 'react';
import PropTypes from 'prop-types';

import './RainbowFrame.css';

class RainbowFrame extends React.Component {
    static propTypes = {
        colors: PropTypes.array.isRequired,
    };

    createFrame = (colorsProp, childrenProp) => { // конструктор обертки, принимающий: 1. пропс colors (массив цветов), 2. пропс children (оборачиваемый объект)
        let array = [...colorsProp]; //копируем массив цветов
        let lastElem = array.length - 1; //рекурсия формирует jsx от последнего к первому элементу массива цветов

        function rec (index) {
            return (index === 0) ? //если это первый элемент массива (index==0),
            <div style={{border:`solid 7px ${array[index]}`, padding:'6px 6px', display:'inline-block'}}>{ childrenProp }</div> :  //то innerHtml = this.props.children
            <div style={{border:`solid 7px ${array[index]}`, padding:'6px 6px', display:'inline-block'}}>{ rec(index-1) }</div>; //если нет (index!=0), то innerHtml = div с другим элементом (index-1) массива
        }

        return rec(lastElem); //передаем последний элемент массива
    }

    render() {
        return this.createFrame(this.props.colors, this.props.children);
    }
}

export default RainbowFrame;
