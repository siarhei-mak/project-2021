import React from 'react';
import './PersonalCabinet.css';
import {connect} from 'react-redux';
import ListProduct from './ListProduct'
import {addProduct, } from '../store/action/stateApp'
import {activeProductId} from '../store/action/allCategory'

class PersonalCabinet extends React.Component{

  findProductInStore(){
    const bascketProduct=this.props.stateApp.activeUser.bascetProduct; // [0,1]

    return( bascketProduct.map((item,index)=>{
      const categoryName=item.categoryName;
      const productId=item.productId;
      const storeProduct=this.props.dataShop.dataShop.category
      const itemProduct=storeProduct[categoryName].products.filter(item=>item.id===productId  )[0]
        return (
           <ListProduct item={itemProduct} key={categoryName+''+productId}
            checkCategoryName={categoryName} 
            onActiveProductId={this.props.activeProductId}
                /> 
        )
    })
    )
  }

  render(){
    // console.log(this.props)
    let arrProduct=this.findProductInStore();

    return (
      <div className='PersonalCabinet'>
      
        <div className='blockProduct'>
             {arrProduct}
        </div>
      </div>
    )
  }

}

function mapStateToProps(state) {
  return {
    chooseUser:state.chooseUser,
   stateApp:state.stateApp,
   dataShop:state.dataShop,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addProduct:(category, idProduct)=>dispatch(addProduct(category, idProduct)),
    activeProductId: (productId)=>dispatch (activeProductId(productId)) 

  }
}
export default connect(mapStateToProps,mapDispatchToProps)(PersonalCabinet)