import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import './Shop.css';

import Product from './Product';
import ProductCard from './ProductCard';
import EditProduct from './EditProduct';
import AddProduct from './AddProduct';

class Shop extends React.Component {
    static propTypes = {
        shopName: PropTypes.string,
        products: PropTypes.arrayOf(
            PropTypes.shape({
                code: PropTypes.number.isRequired,
                name: PropTypes.string.isRequired,
                price: PropTypes.number.isRequired,
                quantity: PropTypes.number.isRequired,
                url: PropTypes.string.isRequired,
            })
        ),
    };

    state = {
        products: this.props.products,  //массив продуктов
        selectedProductId: null, // id выделенной строки с продуктом в настоящий момент
        viewMode: 0, //Режим отображения: 0 - ничего не отображает (по умолчанию), 1 - покажет карточку товара (компонент  ProductCard), 2 - режим редактирования (EditProduct), 3 - режим добавления (AddProduct)

        isEnableButtonsSelections: true, // true - кнопки edit, delete, new beer, переключение по строкам будут доступны, //false - недоступны

        componentProductCard: { //значения, передаваемые пропсами в компонент ProductCard
            productCardName: null,  //поле name
            productCardPrice: null  //поле price
        },

        componentEditProduct: {
            name: null,
            price: null,
            url: null,
            quantity: null,
        },

    }

    cbDelete = (id) => { // удаление продукта
        let confirmation = confirm(`Продукт будет удален. Вы уверены?`);
        if (confirmation) {
            let filteredProducts = this.state.products.filter(item => item.code !== (id) ); //удаляем, прогоняя через фильтр все айтемы исключая кликнутый

            if (this.state.selectedProductId === id) {
                this.setState({ products: filteredProducts, selectedProductId: null, viewMode: 0 }); //если удаляем выделенную строку, записать в стейт, что выделенной строки нет (selectedProductId: null), и ничего не отображать (mode:)
            } else {
                this.setState({ products: filteredProducts });
            }

        }
    }

    cbSelect = (id) => { // выделение продукта
        if (this.state.selectedProductId && this.state.selectedProductId == id) {   //если кликнули по строке, которая уже выделена
            this.setState({
                selectedProductId: null, //применить состояние "не выделено"
                viewMode: 0, //режим "0" - ничего не отображается
                componentProductCard: {
                    name: null, //очищаю стейт на всякий случай, компонент ProductCard не отображается
                    price: null //очищаю стейт на всякий случай, компонент ProductCard не отображается
                }
            });
        } else {    //если кликнули по ранее не выделенной строке
            let productCardH = this.state.products.filter(item => item.code === (id) ); //формируем данные для пропсов для компонента ProductCard
            this.setState({
                selectedProductId: id,  // выделить строку с id (code)
                viewMode: 1,    // устанавливаем режим "1" - показать компонент ProductCard
                componentProductCard: {
                    name: productCardH[0].name, //записываем в состояние пропс name для компонента ProductCard
                    price: productCardH[0].price    //записываем в состояние пропс price для компонента ProductCard
                }
            });
        }
    }

    cbEnableButtonsSelections = (bool) => { // запретить/разрешить кнопки edit, delete, new beer, переключение по строкам
        this.setState({isEnableButtonsSelections: bool}); //true заблокирует кнопки edit, delete, new beer, переключение по строкам
    }

    cbToDefaultState = () => { //переключить в первоначальный вид
        this.setState({
            selectedProductId: null, //сбрасываем выделение
            viewMode: 0, //сбрасываем состояние отображения компонентов
            isEnableButtonsSelections: true, //разрешаем нажатие кнопок edit delete, выделение строк
        })
    }

    cbEditProductSaveAction = (obj) => { //сохранить изменения (комп. EditProduct)
        let newProducts = this.state.products.map(function(item){
            if(item.code == obj.id) {
                let {id, inputName, inputPrice, inputQuantity, inputUrl} = obj;
                return {code:id, name: inputName, price: inputPrice, quantity: inputQuantity, url: inputUrl};
            }
            return item;
        });
        this.setState({
            products: newProducts,
            selectedProductId: null,
            viewMode: 0,
            isEnableButtonsSelections: true,
        })
    }

    cbEditProductRun = (id) => { // переключить viewmode в режим редактирования товара (комп. EditProduct)
        let productCardH = this.state.products.filter(item => item.code === (id) );
        this.setState({
            selectedProductId: id,
            viewMode: 2,
            componentEditProduct: {
                id: productCardH[0],id,
                name: productCardH[0].name,
                price: productCardH[0].price,
                url: productCardH[0].url,
                quantity: productCardH[0].quantity,
            },
        });
    }

    cbAddProductRun= () => { // переключить viewmode в режим добавления товара (комп. AddProduct)
        this.setState({
            selectedProductId: null,
            viewMode: 3,
            isEnableButtonsSelections: false,
        })
    }

    cbAddProductAddAction = (obj) => { // добавить продукт

        let newProducts = [...this.state.products];
        let id = newProducts[newProducts.length-1].code+1; //присваеваем id равный последнему элементу массива + 1,
        let {inputName, inputPrice, inputQuantity, inputUrl} = obj;

        inputPrice = Number(inputPrice);
        inputQuantity = Number(inputQuantity);

        newProducts.push({code:id, name: inputName, price: inputPrice, quantity: inputQuantity, url: inputUrl});

        this.setState({
            products: newProducts,
            selectedProductId: null,
            viewMode: 0,
            isEnableButtonsSelections: true,
        }, ()=>console.table(newProducts)) //для проверки
    }

    render() {
        let products = this.state.products.map(item => <Product
            key = {item.code}
            id = {item.code}
            name = {item.name}
            price = {item.price}
            quantity = {item.quantity}
            url = {item.url}
            cbDelete = {this.cbDelete}
            cbSelect = {this.cbSelect}
            cbEditProductRun = {this.cbEditProductRun}
            isSelected = { (item.code === this.state.selectedProductId) ? true : false }
            isEnableButtonsSelections = {this.state.isEnableButtonsSelections}
            />
        );

        return (
            <Fragment>
                <table className='Shop'>
                    <caption>{this.props.shopName}</caption>
                    <thead>
                        <tr>
                            <td>Name</td>
                            <td>Price</td>
                            <td>URL</td>
                            <td>Quantity</td>
                            <td>Control</td>
                        </tr>
                    </thead>
                    <tbody>
                        {products}
                    </tbody>
                </table>

                {this.state.viewMode < 2 && //показывать кнопку "New beer" только в режимах "0" и "1"
                    <button onClick = {this.cbAddProductRun}>New beer</button>
                }

                {this.state.viewMode == 1 &&    //если 1, то отрисовать ProductCard с пропсами из state
                    <ProductCard
                    name={this.state.componentProductCard.name}
                    price={this.state.componentProductCard.price}
                    />
                }

                {this.state.viewMode == 2 &&
                    <EditProduct
                    id={this.state.componentEditProduct.id}
                    name={this.state.componentEditProduct.name}
                    price={this.state.componentEditProduct.price}
                    quantity={this.state.componentEditProduct.quantity}
                    url={this.state.componentEditProduct.url}
                    cbEnableButtonsSelections = {this.cbEnableButtonsSelections}
                    cbToDefaultState = {this.cbToDefaultState}
                    cbEditProductSaveAction = {this.cbEditProductSaveAction}
                    />
                }

                {this.state.viewMode == 3 &&
                    <AddProduct
                    cbEnableButtonsSelections = {this.cbEnableButtonsSelections}
                    cbToDefaultState = {this.cbToDefaultState}
                    cbAddProductAddAction = {this.cbAddProductAddAction}

                    />
                }
            </Fragment>
        );
    }

}

export default Shop;
