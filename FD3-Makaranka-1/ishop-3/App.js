'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import initialProductsData from './products_data.json';
import Shop from './components/Shop';

let initialShopName = 'Интернет-магазин ishop3';

ReactDOM.render(
    <Shop
        shopName = {initialShopName}
        products = {initialProductsData}
    />
    , document.getElementById('container')
);
