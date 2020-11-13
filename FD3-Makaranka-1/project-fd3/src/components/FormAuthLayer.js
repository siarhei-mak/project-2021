import React from 'react';
import './FormAuthLayer.css';
import Backdrop from './Backdrop'
import {connect} from 'react-redux';
import {addUser,activeUser} from '../store/action/stateApp'
import FormUI from './FormUI'

class FormAuthLayer extends React.PureComponent {



  state = {
    newUser:false,
    login:'',
    password:'',
    errorText:'',
  }

  styleClass(){
    let styleClass=['FormAuthLayer'];
    if(!this.props.isOpen){
      styleClass.push('close')
    }
    else{
      styleClass.push('open')
    }

    return styleClass.join(' ')
  }

  toggleRegistrUser=()=>{
    this.setState({
      newUser:!this.state.newUser,
    })
  }
  showError(text){
    this.setState({
      errorText:text,
    })

  }
  checkLoginPassword=(param)=>{
    if(param==='badTest'){
      this.showError('Нажата тестовая кнопка')

    }
    let messageError=[],statusLogin;
    const userLogin=this.state.login;
    const userPassword=this.state.password;
    

    if(!this.state.newUser){
      statusLogin=this.toCheckInStore(userLogin, userPassword)
     
        if(!statusLogin){
          messageError.push('Введите данные')
          
        }
    };
    if(this.state.newUser){
      messageError=this.validate(userLogin, userPassword);
        if(messageError.length==0){
          statusLogin=true;
          this.toAddUser(userLogin, userPassword)
        }
    }

    if(statusLogin){
      this.success()
      this.toActiveUser(userLogin,userPassword)
    }
    else{
      messageError=messageError.join(' ');
      this.showError(messageError)
      this.toggleRegistrUser()
    }
   

  }
  success(){
    this.props.onClose();
    this.props.onToggleLoginStatus();
    this.toggleRegistrUser();
    this.setState({
      login:'',
      password:'',
      errorText:'',
    })
  }
  toAddUser(userLogin, userPassword){

    this.props.addUser(userLogin, userPassword )
  }

toCheckInStore(userLogin, userPassword){
  const usersArr=this.props.stateApp.users;
  let statusLogin=usersArr.some(item=>{
    return (item.login==userLogin) && (item.password==userPassword)
  })
  return statusLogin
}

  toActiveUser(userLogin,userPassword){
    this.props.checkActiveUser(userLogin,userPassword)
  }

  validate=(userLogin, userPassword)=>{
    let messageError=[]
    if(this.state.login.length<=2){
      messageError.push('Короткий LOGIN')
    }
     if(this.state.password<=2){
      messageError.push('Короткий Password')
    }
    if(this.toCheckInStore(userLogin, userPassword)){
      messageError=['Такой пользователь уже существует']
    }
    // console.log(messageError)

    return messageError;
  }

  onChangeLoginInfo=(param, type)=>{
    this.setState({
      [type]:param
    })
  }

  render(){
//  console.log('props--',this.props)
//    console.log('state--',this.state)

 return(
  (this.props.loginStatus)
  ?null      
  :<React.Fragment>
      <div  className={`${this.styleClass()}`}>
          <FormUI login={this.state.login } password={this.state.password} 
        onChangeLoginInfo={this.onChangeLoginInfo}  checkLoginPassword={this.checkLoginPassword}
        onClose={this.props.onClose} onToggleLoginStatus={this.props.onToggleLoginStatus }
        loginStatus={this.props.loginStatus} newUser={this.state.newUser}
        toggleRegistrUser={this.toggleRegistrUser} errorText={this.state.errorText}
        />
   
     </div>
     {
      (this.props.isOpen)
      ?<Backdrop  onClose={this.props.onClose}  />
      :null
      }
  </React.Fragment>

)
  }
}

function mapStateToProps(state) {
  return {
   stateApp:state.stateApp
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    addUser:(login,password)=>dispatch(addUser(login,password)),
    checkActiveUser: (userLogin,userPassword)=>dispatch(activeUser(userLogin,userPassword)),
  }
}

export default connect (mapStateToProps, mapDispatchToProps) (FormAuthLayer)


