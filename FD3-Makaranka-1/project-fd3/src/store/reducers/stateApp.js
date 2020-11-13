import {
  IS_LOGIN,
  ADD_USER,
  ACTIVE_USER,
  ADD_PRODUCT,
  DELETE_PRODUCT

} from '../action/actionTypes'

const initialState = {
isLogin:false,
users:[
  {login:123, password:123,
     bascetProduct: [{categoryName:'darkBeer', productId:21}]}
],
activeUser:{ },

  //  activeUser:{login:123, password:123,
  //   bascetProduct:[ {categoryName:'darkBeer', productId:21}, {categoryName:'darkBeer', productId:22} ]}
}


export const getStateApp= (state=initialState, action)=> {
switch(action.type){
case IS_LOGIN:
 return{
   ...state,
   isLogin:action.status,
 }
 case ADD_USER:
 return{
   ...state,
   users:[...state.users, {login:action.login, password:action.password,  bascetProduct: {categoryName:'darkBeer', productId:22} } ]
  }
  case ACTIVE_USER:
  return{
    ...state,
    activeUser: {login:action.userLogin, password:action.userPassword,
      bascetProduct: [{categoryName:'darkBeer', productId:21}]},
  }
  case ADD_PRODUCT:
  return{
    ...state,
    activeUser:{...state.activeUser,bascetProduct: [...state.activeUser.bascetProduct, {categoryName:action.category, productId:action.idProduct}]},
  }
  case DELETE_PRODUCT:
  return{
    ...state,
    activeUser:{...state.activeUser,bascetProduct:state.activeUser.bascetProduct.filter((item,index)=>index!=action.index) },
  }
default:
 return state
}

}
