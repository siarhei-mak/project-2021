import {
  IS_LOGIN,
  ADD_USER,
  ACTIVE_USER,
  ADD_PRODUCT,
  DELETE_PRODUCT
} from './actionTypes'





export function isLogin (status) {
  return{
    type:IS_LOGIN, status 
  }
}

export function addUser (login,password) {
  
  return{
    type:ADD_USER, login,password 
  }
}
export function activeUser (userLogin,userPassword) {

  return{
    type:ACTIVE_USER, userLogin,userPassword
  }
}
export function addProduct (category, idProduct) {

  return{
    type:ADD_PRODUCT, category, idProduct
  }
}
export function deleteProduct (index) {

  return{
    type:DELETE_PRODUCT, index
  }
}