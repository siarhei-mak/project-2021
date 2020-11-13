
import {combineReducers} from 'redux'
import {getAllCategoryReducer} from './allCateory'
import {getAxiosInfo} from './shopInfo'
import {getStateApp} from './stateApp'



const shopApp=combineReducers({
  chooseUser:getAllCategoryReducer,
  dataShop:getAxiosInfo,
  stateApp:getStateApp,
})

export default shopApp