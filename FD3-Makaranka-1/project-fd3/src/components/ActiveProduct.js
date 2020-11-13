import React from 'react'
import './ActiveProduct.css';
import { Table, Popconfirm,Button } from 'antd';

const columns = [{
  title: 'Описание',
  dataIndex: 'param',
  key: 'param',
  width: '150px',

}, {
  title: 'Информация',
  dataIndex: 'mean',
  key: 'mean',
  width: '150px',
},
];


let ActiveProduct=(props)=>{

  // console.log('ActiveProduct---',props)
 let descriptionParam=Object.keys(props.descriptionProduct)
//  console.log(descriptionParam)

 let data=descriptionParam.map((item, index)=>{
  return(
{
  key: index,
  param:item ,
  mean:props.descriptionProduct[item]
}
  )
})

// console.log(data)


  return(
    <React.Fragment>
      <div className='ActiveProduct'>
        <div className='conteiner' >
          <div className='table_info'>
            <Table columns={columns} dataSource={data} pagination={false} width={'500px'}/>
          </div>
         <div className='img_block'>

           <img src={ require ('../img/product/id' + props.productId+'.jpeg')}   alt='png'/>
         </div>
       </div>
       <div>

      {
      (props.isLogin)
      ? <React.Fragment>
           <Popconfirm title="Удалить выбранный продукт из корзины"
             onConfirm={(productId)=>props.deleteProductFromLoginUser( props.productId  )}
              onCancel={( )=>props.onMessage('Отмена удаления' ) }
              okText="Yes" cancelText="No">
              <Button type="primary" className='Button' >Удалить товар   </Button>

          </Popconfirm>

          <Button type="primary"   onClick={()=>props.addProductToLoginUser(props.categoryName, props.productId)} >Добавить</Button>

        </React.Fragment>
        :<Button type="primary" onClick={props.omNotification} >Добавить</Button>


      }
      </div>
      </div>
    </React.Fragment>
  )
}

export default  ActiveProduct
