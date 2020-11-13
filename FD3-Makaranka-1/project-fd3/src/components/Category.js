import React from 'react';
import './Category.css';
import ListProduct from './ListProduct'
import {connect} from 'react-redux';
import {activeProductId} from '../store/action/allCategory'
import SearchField from './SearchField'


class Category extends React.Component{
  state={
    arrLimitPrice:[5, 150],
    arrAvailableRange:[],
    doSort:false,
    sortArrProduct:[],
  }

  onAfterChange=(value)=>{
    // console.log('onAfterChange:', value);
    // вижу в массиве 2 числа
   this.setState({
    arrLimitPrice:value,
   })
  }

  onChangeCheckBox=(checkedValues)=>{
    // console.log('checked = ', checkedValues);

    this.setState({
      arrAvailableRange:checkedValues,
     })

  }
  toMakeRangeCategory=()=>{
    let categoryName=this.props.match.params.name;
    let storeCategory=this.props.dataShop.dataShop.category[categoryName].products;
    let arrRange={}
    storeCategory.forEach(item=>{
      if(item.searchInfo.name in arrRange){
          return
      }
      else{
        arrRange[item.searchInfo.name]=true
      }
      });
    arrRange=Object.keys(arrRange)
      return {arrRange, storeCategory}

  }

  toSortListCategory=()=>{
    let showArr=[];
    // console.log('SORT')
    let categoryName=this.props.match.params.name;
    let storeCategory=this.props.dataShop.dataShop.category[categoryName].products;

  if(this.state.arrLimitPrice.length!==0){
    showArr=storeCategory.filter(item=>(this.state.arrLimitPrice[0]<item.searchInfo.price) && (item.searchInfo.price<this.state.arrLimitPrice[1]))

    if(this.state.arrAvailableRange.length!==0){
      showArr=showArr.filter(item=>{
        for(let v of this.state.arrAvailableRange){
          if(v==item.searchInfo.name)
          return item
        }
      })
    }
  }

  if(this.state.arrAvailableRange.length!==0 && this.state.arrLimitPrice.length===0 ){
    showArr=storeCategory.filter(item=>{
      for(let v of this.state.arrAvailableRange){
        if(v==item.searchInfo.name)
        return item
      }
    })
  }

     this.setState({
       doSort:true,
      sortArrProduct:showArr

     })

  }

  componentDidUpdate(prevProps,prevState){

    if(prevProps.match.params.name!==this.props.match.params.name){
      // console.log('=========')
      this.setState({
        arrLimitPrice:[500, 1500],
        arrAvailableRange:[],
        doSort:false,
        sortArrProduct:[],

           })
    }
  }

  render(){
  //  console.log('Category from', this.props)
    // console.log('Category STATE', this.state)
    let {arrRange,storeCategory }= this.toMakeRangeCategory();

    let arrAnswers=storeCategory.map((item, index)=>
     <ListProduct item={item} key={index+item.searchInfo.name}
       checkCategoryName={this.props.match.params.name}
       onActiveProductId={this.props.activeProductId}
     /> )

    return (
      <div className='Category'>
        <div className='filter_field'>
          <SearchField key={arrRange[0]} arrRange={arrRange} toSortListCategory={this.toSortListCategory}
          onAfterChange={this.onAfterChange}  onChangeCheckBox={this.onChangeCheckBox}
          />
        </div>

        <div className='block_product' >
          {
            (this.state.doSort)
            ?(this.state.sortArrProduct.length===0)
              ?null
              :

            (this.state.sortArrProduct.map((item, index)=>
     <ListProduct item={item} key={index+item.searchInfo.name}
       checkCategoryName={this.props.match.params.name}
       onActiveProductId={this.props.activeProductId}
     /> ))
            :arrAnswers
          }
        </div>
      </div>
    )
  }
}


const mapDispatchToProps = (dispatch) => {

  return {
    activeProductId: (productId)=>dispatch (activeProductId(productId))
   }
  }

function mapStateToProps(state) {
  return {
    chooseUser:state.chooseUser,
   dataShop:state.dataShop
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (Category)
