import React from 'react';
import PropTypes from 'prop-types';

import './ProductCard.css';

class ProductCard extends React.Component {
    static propTypes = {
        name: PropTypes.string,
        price: PropTypes.number,
    };

    render(){
        return(
            <div className = 'ProductCard'>
                <h2>{this.props.name}</h2>
                <p>{this.props.price}</p>
            </div>
        );
    }
}

export default ProductCard;