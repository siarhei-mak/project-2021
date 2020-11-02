import React from 'react';
import PropTypes from 'prop-types';

import './Product.css';

class Product extends React.Component {
    static propTypes = {
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.any.isRequired,
        quantity: PropTypes.any.isRequired,
        url: PropTypes.string.isRequired,
        cbDelete: PropTypes.func.isRequired,
        cbSelect: PropTypes.func.isRequired,
        cbEditProductRun: PropTypes.func.isRequired,
        isSelected: PropTypes.bool,
        isEnableButtonsSelections: PropTypes.bool.isRequired,
    }

    deleteButtonClicked = (EO) => {
        this.props.cbDelete(this.props.id);
        EO.stopPropagation();
    }

    rowClicked = () => {
        if(this.props.isEnableButtonsSelections === false) return null;
        this.props.cbSelect(this.props.id);
    }

    editButtonClicked = (EO) => {
        this.props.cbEditProductRun(this.props.id);
        EO.stopPropagation();
    }

    render(){

        let classNameTr = 'Product';
        if(this.props.isSelected) classNameTr += ' active';

        return(
            <tr className={classNameTr} onClick={ this.rowClicked }>
                <td>{this.props.name}</td>
                {/* <td>{ this.props.price.toFixed(2) }</td> */}
                <td>{this.props.price}</td>
                <td>{this.props.url}</td>
                <td>{this.props.quantity}</td>
                <td>
                    {/* {console.log(this.props.isEnableButtonsSelections)} */}
                    <button disabled={(this.props.isEnableButtonsSelections === false) && true} onClick={this.editButtonClicked}>Edit</button>
                    <button disabled={(this.props.isEnableButtonsSelections === false) && true} onClick={this.deleteButtonClicked}>Delete</button>
                </td>
            </tr>
        );

    }

}

export default Product;