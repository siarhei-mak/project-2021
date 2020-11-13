import {GET_AXIOS_DATA_INFO,
       AXIOS_ERROR,
       IS_LOADING_FALSE,

       BLOCK_NEWS_SUCSSES
} from '../action/actionTypes'
import {initState, blockNews} from '../../storeInfo'

const initialState = {
  dataShop: '',
  isLoading:true,
  blockNews:''

}


export const getAxiosInfo= (state=initialState, action)=> {
  switch(action.type){
    case GET_AXIOS_DATA_INFO:

      return{
        ...state,
        dataShop:action.dataShop,
       dataShop:{...initState},
      }

    case AXIOS_ERROR:
    return{
      ...state,
     //  dataShop:{...initState},
     //  blockNews:blockNews,
    //   dataShop:action.dataShop,
    //  blockNews:action.blockNews,
    }
    case IS_LOADING_FALSE:
    return{
      ...state,
      isLoading:false

    }
    case BLOCK_NEWS_SUCSSES:
    return{
      ...state,
     blockNews:action.blockNews,
      blockNews:blockNews,
    }

    default:
      return state
  }

}
