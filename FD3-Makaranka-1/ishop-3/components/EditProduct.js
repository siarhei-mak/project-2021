import React from 'react';
import PropTypes from 'prop-types';

import './EditProduct.css';

class EditProduct extends React.Component {
    static propTypes = {
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        quantity: PropTypes.number.isRequired,
        url: PropTypes.string.isRequired,
        cbEnableButtonsSelections:PropTypes.func.isRequired,
        cbToDefaultState: PropTypes.func.isRequired,
        cbEditProductSaveAction: PropTypes.func.isRequired,
    }

    constructor(props) {
        super(props);
        
        this.state = {
            
            // id: this.props.id,
            // inputName: this.props.name,
            // inputPrice: this.props.price,
            // inputQuantity: this.props.quantity,
            // inputUrl: this.props.url,

            saveButtonEnable: true,

            validate: {
                inputName: {
                    status: null,
                    errorMessage: '',
                },
                inputPrice: {
                    status: null,
                    errorMessage: '',
                },
                inputQuantity: {
                    status: null,
                    errorMessage: '',
                },
                inputUrl: {
                    status: null,
                    errorMessage: '',
                },
            },
        }

        let {id, inputName, inputPrice, inputQuantity, inputUrl} = this.setInputFromProps();
        [this.state.id, this.state.inputName, this.state.inputPrice, this.state.inputQuantity, this.state.inputUrl] = [id, inputName, inputPrice, inputQuantity, inputUrl];

    }

    componentDidUpdate(prevState) {
        // if (prevState.id !== this.props.id) {
        //     this.setState({
        //         id : this.props.id,
        //         inputName : this.props.name,
        //         inputPrice : this.props.price,
        //         inputQuantity : this.props.quantity,
        //         inputUrl : this.props.url,
        //     })
        // }
        if (prevState.id !== this.props.id) {
            this.setState(this.setInputFromProps());
        }
    }

    setInputFromProps = () => {
        return ({
            id : this.props.id,
            inputName : this.props.name,
            inputPrice : this.props.price,
            inputQuantity : this.props.quantity,
            inputUrl: this.props.url,
        });
    }


    handlerInput = (EO) => {
        switch (EO.target.id) {
            case 'inputName':
                (this.props.name).toString() !== (EO.target.value).toString() ? this.props.cbEnableButtonsSelections(false) : this.props.cbEnableButtonsSelections(true); //если значение в input отличается от изначального, сделать состояние кнопок и выделений строк заблокированным
                this.inputValidate(EO);
                this.setState({inputName: EO.target.value});
                break;
            case 'inputPrice':
                (this.props.price).toString() != (EO.target.value).toString() ? this.props.cbEnableButtonsSelections(false) : this.props.cbEnableButtonsSelections(true);
                this.inputValidate(EO);
                this.setState({inputPrice: EO.target.value});
                break;
            case 'inputQuantity':
                (this.props.quantity).toString() !== (EO.target.value).toString() ? this.props.cbEnableButtonsSelections(false) : this.props.cbEnableButtonsSelections(true);
                this.inputValidate(EO);
                this.setState({inputQuantity: EO.target.value});
                break;
            case 'inputUrl':
                (this.props.url).toString() !== (EO.target.value).toString() ? this.props.cbEnableButtonsSelections(false) : this.props.cbEnableButtonsSelections(true);
                this.inputValidate(EO);
                this.setState({inputUrl: EO.target.value});
                break;
        }
    }

    inputValidate = (EO) => {
        switch (EO.target.id) {
            case 'inputName':
                if(!EO.target.value) {
                    this.setState(prevState => {
                        let validate = {...prevState.validate};
                        validate.inputName.status = false;
                        validate.inputName.errorMessage = 'Не должно быть пустым';
                        return {validate};
                    });
                } else {
                    this.setState(prevState => {
                        let validate = {...prevState.validate};
                        validate.inputName.status = true;
                        validate.inputName.errorMessage = '';
                        return {validate};
                    });
                }
                break;

            case 'inputPrice':
                if(!EO.target.value) {
                    this.setState(prevState => {
                        let validate = {...prevState.validate};
                        validate.inputPrice.status = false;
                        validate.inputPrice.errorMessage = 'Не должно быть пустым';
                        return {validate};
                    });
                } else if( isNaN(Number(EO.target.value)) ) {
                    this.setState(prevState => {
                        let validate = {...prevState.validate};
                        validate.inputPrice.status = false;
                        validate.inputPrice.errorMessage = 'Введите числовое значение';
                        return {validate};
                    });
                } else {
                    this.setState(prevState => {
                        let validate = {...prevState.validate};
                        validate.inputPrice.status = true;
                        validate.inputPrice.errorMessage = '';
                        return {validate};
                    });
                }
                break;

            case 'inputQuantity':
                if(!EO.target.value) {
                    this.setState(prevState => {
                        let validate = {...prevState.validate};
                        validate.inputQuantity.status = false;
                        validate.inputQuantity.errorMessage = 'Не должно быть пустым';
                        return {validate};
                    });
                } else if( isNaN(Number(EO.target.value)) ) {
                    this.setState(prevState => {
                        let validate = {...prevState.validate};
                        validate.inputQuantity.status = false;
                        validate.inputQuantity.errorMessage = 'Введите числовое значение';
                        return {validate};
                    });
                } else {
                    this.setState(prevState => {
                        let validate = {...prevState.validate};
                        validate.inputQuantity.status = true;
                        validate.inputQuantity.errorMessage = '';
                        return {validate};
                    });
                }
                break;

            case 'inputUrl':
                if(!EO.target.value) {
                    this.setState(prevState => {
                        let validate = {...prevState.validate};
                        validate.inputUrl.status = false;
                        validate.inputUrl.errorMessage = 'Не должно быть пустым';
                        return {validate};
                    });
                } else {
                    this.setState(prevState => {
                        let validate = {...prevState.validate};
                        validate.inputUrl.status = true;
                        validate.inputUrl.errorMessage = '';
                        return {validate};
                    });
                }
                break;
        }
    }

    handlerSaveButton = () => {
        this.props.cbEditProductSaveAction({ ...this.state });
    }

    handlerCancelButton = () => {
        this.props.cbToDefaultState();
    }

    render() {
        return(
            
            <div className="EditProduct">
                <h2>Edit existing Product</h2>

                <table>
                    <tbody>
                        <tr>
                            <td><p>ID: {this.state.id}</p></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr className ="product-field">
                            <td><label htmlFor="inputName">Name</label></td>
                            <td><input id="inputName" type="text" onChange={this.handlerInput} value={this.state.inputName} autoComplete={'off'}/></td>
                            <td>
                                {this.state.validate.inputName.status === false && 
                                <span className="error-message">{this.state.validate.inputName.errorMessage}</span>}
                            </td>
                        </tr>

                        <tr className ="product-field">
                            <td><label htmlFor="inputPrice">Price</label></td>
                            <td><input id="inputPrice" type="text" onChange={this.handlerInput} value={this.state.inputPrice} autoComplete={'off'}/></td>
                            <td>
                                {this.state.validate.inputPrice.status === false && 
                                <span className="error-message">{this.state.validate.inputPrice.errorMessage}</span>}
                            </td>
                        </tr>

                        <tr>
                            <td><label htmlFor="inputUrl">URL</label></td>
                            <td><input id="inputUrl" type="text" onChange={this.handlerInput} value={this.state.inputUrl} autoComplete={'off'}/></td>
                            <td>
                                {this.state.validate.inputUrl.status === false && 
                                <span className="error-message">{this.state.validate.inputUrl.errorMessage}</span>}
                            </td>
                        </tr>

                        <tr>
                            <td><label htmlFor="inputQuantity">Quantity</label></td>
                            <td><input id="inputQuantity" type="text" onChange={this.handlerInput} value={this.state.inputQuantity} autoComplete={'off'}/></td>
                            <td>
                                {this.state.validate.inputQuantity.status === false && 
                                <span className="error-message">{this.state.validate.inputQuantity.errorMessage}</span>}
                            </td>
                        </tr>
                    </tbody>
                </table>

                <button 
                onClick={this.handlerSaveButton}
                disabled = {
                    (this.state.validate.inputName.status==false ||
                    this.state.validate.inputPrice.status==false ||
                    this.state.validate.inputQuantity.status==false ||
                    this.state.validate.inputUrl.status==false)
                    &&
                    true
                }>Save</button>
                <button onClick={this.handlerCancelButton}>Cancel</button>

            </div>
        );
    }
}

export default EditProduct;