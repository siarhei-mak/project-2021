import React from 'react';
import PropTypes from 'prop-types';

import './DoubleButton.css'

const DoubleButton = (props) => {
    const handleClick = (EO) => { //обработка возврата коллбека по клику
        props.cbPressed(EO.target.getAttribute('data-num')); // Коллбек принимает номер inputа из атрибута data-num.
    };

    return ( //каждому input присваивается атрибут 'data-num' со значением '1' и '2' соответственно.
        <div className='DoubleButton'>
            <input data-num={1} onClick={handleClick} value = {props.caption1} type='button' />
            <span>{props.children}</span>
            <input data-num={2} onClick={handleClick} value = {props.caption2} type='button' />
        </div>
    );
}

DoubleButton.propTypes = {
    caption1: PropTypes.string.isRequired,
    caption2: PropTypes.string.isRequired,
    cbPressed: PropTypes.func.isRequired,
}

export default DoubleButton;
