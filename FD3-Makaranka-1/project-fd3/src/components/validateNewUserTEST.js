
const usersArr=[
  {login:123, password:123,
     bascetProduct: [{categoryName:'darkBeer', productId:21}]}
]

function toCheckInStore(userLogin, userPassword){
  let statusLogin=usersArr.some(item=>{
    return (item.login===parseInt(userLogin)) && (item.password===parseInt(userPassword))
  })
  return statusLogin
}



 function validate(userLogin, userPassword){
    // console.log('validate')
    let messageError=[]
    if(userLogin.length<=2){
      messageError.push('Короткий LOGIN')
    }
     if(userPassword<=2){
      messageError.push('Короткий Password')
    }
    if(toCheckInStore(userLogin, userPassword)){
      messageError=['Такой пользователь уже существует']
    }
//    console.log(messageError)

    return messageError;
  }

  export {validate};
