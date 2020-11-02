import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import './Br2jsx.css';

const Br2jsx = props => {

    let wordsArray = props.text.split(/<br>|<br ?\/>/); //разбиваем строку на массив слов, регулярка: /все подстроки <br>, <br/> и <br />/
    let lastIndex = wordsArray.length - 1; //запоминаем последний элемент массива arr

    let jsx = wordsArray.map((item,index) => (index == lastIndex) ? <Fragment key={index}>{item}</Fragment> : <Fragment key={index}>{item}<br/></Fragment>); //формируем jsx: если элемент последний, то сохраняем item без тега <br>, иначе - с <br>

    return <div className="br2jsx">{ jsx }</div>;
};

Br2jsx.propTypes = {
    text: PropTypes.string.isRequired,
};

export default Br2jsx;