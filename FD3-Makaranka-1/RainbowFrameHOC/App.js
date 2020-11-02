'use strict';
import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';

import DoubleButton from './components/DoubleButton';
import { withRainbowFrame } from './components/withRainbowFrame';


let colors=['red','orange', 'yellow','green', '#00BFFF', 'blue', 'purple'];

let cbPressed = num => alert(num);

let FramedDoubleButton = withRainbowFrame(colors)(DoubleButton);

ReactDOM.render(
    <Fragment>

        <DoubleButton caption1={'однажды'} caption2={'пору'} cbPressed={cbPressed}>{'в студеную зимнюю'}</DoubleButton>
        <br /><br /><br />
        <FramedDoubleButton caption1={'я из лесу'} caption2={'мороз'} cbPressed={cbPressed}>
            {'вышел, был сильный'}
        </FramedDoubleButton>

    </Fragment>


    , document.getElementById('container')
);
