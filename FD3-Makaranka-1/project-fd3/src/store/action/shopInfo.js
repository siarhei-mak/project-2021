import {
  GET_AXIOS_DATA_INFO,
  AXIOS_ERROR,
  IS_LOADING_FALSE,
  BLOCK_NEWS_SUCSSES
} from './actionTypes'
import axios from 'axios'


export function getAxiosInfo () {
  // console.log("начало  загрузки")
  return async dispatch=>{
    try{
      const response = await axios.get('https://shopapp-upliner.firebaseio.com/shopApp.json')
      let dataFromFirebaseArr=Object.keys(response.data)
      dataFromFirebaseArr.forEach((item)=>{

       let keyIdFirebaseForCategory= Object.keys(response.data[item])

      if(item==='category'){
        const  category =response.data[item][keyIdFirebaseForCategory];
        dispatch(categorySuccess(category))
      }
      else if (item==='blockNews') {
        const blockNews =response.data[item][keyIdFirebaseForCategory];
        dispatch(blockNewsSuccess(blockNews))
      }
      })
      dispatch(isLoadingFalse())

    }
    catch(e){
      // console.log("error axiosError ")
      console.log(e)
      dispatch(axiosError())
      dispatch(isLoadingFalse())
    }
  }
}



export function categorySuccess (dataFromFirebase) {
  // console.log('good axiosSuccess--->', dataFromFirebase)
  return{
    type:GET_AXIOS_DATA_INFO, dataShop:dataFromFirebase
  }
}

export function axiosError () {
  // console.log('bad')
  return{
    type:AXIOS_ERROR,
  }
}


export function blockNewsSuccess (blockNews) {
  return{
    type:BLOCK_NEWS_SUCSSES, blockNews
  }
}


export function isLoadingFalse () {
  return{
    type:IS_LOADING_FALSE
  }
}
