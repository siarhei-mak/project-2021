  import {
    CHECK_CATEGORY,
    CHOOSE_PRODUCT,
  
  } from './actionTypes'
 



export function checkCategory (name) {
  return{
    type:CHECK_CATEGORY, name
  }
}

export function activeProductId (productId) {
  return{
    type:CHOOSE_PRODUCT, productId
  }
}


