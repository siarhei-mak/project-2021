import {
  CHECK_CATEGORY,
  CHOOSE_PRODUCT,

} from '../action/actionTypes'




let initState={
    
  activeProductId:'',
  checkCategoryName:'',
}


export const getAllCategoryReducer= (state=initState, action)=> {
  switch(action.type){
      case CHECK_CATEGORY:
    return{
      ...state,
      checkCategoryName:action.name
    }
    case CHOOSE_PRODUCT:
    return{
      ...state,
      activeProductId:action.productId

    }
    default:
      return state
  }
}
