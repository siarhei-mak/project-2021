import React from 'react';
import './CardProduct.css';
import ActiveProduct from './ActiveProduct'
import {connect} from 'react-redux';
import { NavLink } from 'react-router-dom';
import {addProduct, deleteProduct} from '../store/action/stateApp';
import {  message, notification,Button } from 'antd'


class CardProduct extends React.Component{

  // передать  или найти нужный элемент/продукт
  findProductForDetailInfo(){
    const categoryName=this.props.match.params.name;
    const productId=parseInt(this.props.match.params.id);
    const storeCategory=this.props.dataShop.dataShop.category[categoryName];
    const activeProduct=storeCategory.products.filter(item=>item.id===productId)[0];
    const descriptionProduct=activeProduct.description;
    const fullName=activeProduct.fullName;
    return  {descriptionProduct,fullName, categoryName, productId }
  }

  addProductToLoginUser=(categoryName,productId )=>{
    // console.log(this.props.stateApp.isLogin)

      const {isHaveProductInBasket}= this.findProductInBasket(productId)
      if(isHaveProductInBasket){
        this.onMessageError('Уже есть в корзине')
      }
      else{
        this.onMessageSuccess('Продукт успешно добавлен в корзину')
        this.props.addProduct(categoryName,productId)
      }
  }

  deleteProductFromLoginUser=(productId)=>{
    const {isHaveProductInBasket, indexItem}= this.findProductInBasket(productId)

    if(isHaveProductInBasket){
      this.onMessageSuccess('Продукт успешно удален')
      this.props.deleteProduct(indexItem )

    }
    else{
      this.onMessageError('Продукт отсутствует в корзине')
    }
  }


onMessageSuccess=(message)=>{
  message.success(message);
}

onMessageError=(message)=>{
  message.error(message);
}


  findProductInBasket=(productId)=>{
      let indexItem=false;
      let userBasket=this.props.stateApp.activeUser.bascetProduct; // [0,1]  product
     // let isHaveProductInBasket=false
     let isHaveProductInBasket=userBasket.some((item, index) => {
        if(item.productId===parseInt(productId)){
           indexItem=index;
           return true;

        }
        return false;
      });

    return {isHaveProductInBasket, indexItem}
  }
  omNotification=()=>{
    notification.open({
      message: 'Уважаемый посетитель!',
      description: `Добавлять товар могут только зарегистрированные пользователи.
       Выполните пожалуйста вход в личный кабинет,
       или зарегистрируйтесь.`,
      onClick: () => {
      },
    });

  }

  render(){
    // console.log('CardProduct----', this.props)
    // console.log('this.props.stateApp.isLogin ',this.props.stateApp.isLogin);
    let {descriptionProduct,fullName,categoryName, productId } =this.findProductForDetailInfo()

    return (
      <div className='CardProduct'>
      {
          (this.props.stateApp.isLogin)
          ?
          <NavLink to="/personalCabinet"  activeClassName="ActivePageLink">

          <Button type="primary" className='Button_allListProd' >К списку товаров  </Button>
            {/* {`${this.props.stateApp.activeUser.login} cabinet `} */}
          </NavLink>
          :null
      }
          <h2>
         { fullName}
          </h2>
        <ActiveProduct descriptionProduct={descriptionProduct}
        addProductToLoginUser={this.addProductToLoginUser}
         categoryName={categoryName} productId={productId} isLogin={this.props.stateApp.isLogin}
         deleteProductFromLoginUser={this.deleteProductFromLoginUser}
         onMessage={this.onMessageError} omNotification={this.omNotification}

        className='show_product' />

      </div>
    )
  }

}


function mapStateToProps(state) {
  return {
  chooseUser:state.chooseUser,
  dataShop:state.dataShop,
  stateApp:state.stateApp
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addProduct:(category, idProduct)=>dispatch(addProduct(category, idProduct)),
    deleteProduct:(indexItem)=>dispatch(deleteProduct(indexItem))

  }
}
export default connect(mapStateToProps,mapDispatchToProps)(CardProduct)
