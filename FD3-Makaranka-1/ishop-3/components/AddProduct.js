import React from 'react';
import PropTypes from 'prop-types';

import './AddProduct.css';

class AddProduct extends React.Component {
    static propTypes = {
        cbEnableButtonsSelections:PropTypes.func.isRequired,
        cbToDefaultState: PropTypes.func.isRequired,
        cbAddProductAddAction: PropTypes.func.isRequired,
    }

    state = {
        id : '',
        inputName : '',
        inputPrice : '',
        inputQuantity : '',
        inputUrl : '',

        saveButtonEnable: false, // по умолчанию поля пустые и кнопка save неактивна

        validate: {
            inputName: {
                status: false,
                errorMessage: 'Не должно быть пустым',
            },
            inputPrice: {
                status: false,
                errorMessage: 'Не должно быть пустым',
            },
            inputQuantity: {
                status: false,
                errorMessage: 'Не должно быть пустым',
            },
            inputUrl: {
                status: false,
                errorMessage: 'Не должно быть пустым',
            },
        },
    }

    handlerInput = (EO) => { //обработка ввода символов в input, сохранение введенных данных в стейт
        switch (EO.target.id) {
            case 'inputName':
                this.inputValidate(EO)
                this.setState({inputName: EO.target.value});
                break;
            case 'inputPrice':
                this.inputValidate(EO)
                this.setState({inputPrice: EO.target.value});
                break;
            case 'inputQuantity':
                this.inputValidate(EO)
                this.setState({inputQuantity: EO.target.value});
                break;
            case 'inputUrl':
                this.inputValidate(EO)
                this.setState({inputUrl: EO.target.value});
                break;
        }
    }

    inputValidate = (EO) => { //валидация введенных в input данных
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

    handlerSaveButton = () => { //обработка кнопки save
        this.props.cbAddProductAddAction({ ...this.state });
    }

    handlerCancelButton = () => { //обработка кнопки cancel
        this.props.cbToDefaultState();
    }

    render() {
        return(
            <div className="EditProduct">
                <h2>Add new Product</h2>

                <table>
                    <tbody>
                        <tr>
                            <td><p>ID: {this.state.id}</p></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr className ="product-field">
                            <td><label htmlFor="inputName">Name</label></td>
                            <td><input id="inputName" type="text" onChange={this.handlerInput} onBlur={this.inputValidate} value={this.state.inputName} autoComplete={'off'}/></td>
                            <td>
                                {this.state.validate.inputName.status === false && 
                                <span className="error-message">{this.state.validate.inputName.errorMessage}</span>}
                            </td>
                        </tr>

                        <tr className ="product-field">
                            <td><label htmlFor="inputPrice">Price</label></td>
                            <td><input id="inputPrice" type="text" onChange={this.handlerInput} onBlur={this.inputValidate} value={this.state.inputPrice} autoComplete={'off'}/></td>
                            <td>
                                {this.state.validate.inputPrice.status === false && 
                                <span className="error-message">{this.state.validate.inputPrice.errorMessage}</span>}
                            </td>
                        </tr>

                        <tr>
                            <td><label htmlFor="inputUrl">URL</label></td>
                            <td><input id="inputUrl" type="text" onChange={this.handlerInput} onBlur={this.inputValidate} value={this.state.inputUrl} autoComplete={'off'}/></td>
                            <td>
                                {this.state.validate.inputUrl.status === false && 
                                <span className="error-message">{this.state.validate.inputUrl.errorMessage}</span>}
                            </td>
                        </tr>

                        <tr>
                            <td><label htmlFor="inputQuantity">Quantity</label></td>
                            <td><input id="inputQuantity" type="text" onChange={this.handlerInput} onBlur={this.inputValidate} value={this.state.inputQuantity} autoComplete={'off'}/></td>
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
                }>Add</button>
                <button onClick={this.handlerCancelButton}>Cancel</button>
            </div>
        );
    }
}

export default AddProduct;