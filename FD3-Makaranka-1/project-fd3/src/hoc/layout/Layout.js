import React, {Component} from 'react'
import {connect} from 'react-redux';
import LoginBar from '../../components/LoginBar'
import FormAuthLayer from '../../components/FormAuthLayer'
import {isLogin} from '../../store/action/stateApp'

class Layout extends Component {
  state = {
    showForm: false,
    loginStatus:false,
  }

  toggleFormHandler=()=>{
    this.setState({
      showForm: !this.state.showForm
    })
  }

  formCloseHandler = () => {
    this.setState({
      showForm: false
    })
  }

  toggleLoginStatus=()=>{
    this.setState({
      loginStatus:!this.state.loginStatus,
    }, ()=>this.props.isLogin(this.state.loginStatus) )
  }
  render() {
  // console.log('Layout---', this.props)
 

    return (
      <React.Fragment>
      
      <FormAuthLayer  onClose={this.formCloseHandler} isOpen={this.state.showForm} 
          onToggleLoginStatus={this.toggleLoginStatus}  loginStatus={this.props.stateApp.isLogin} />

      <LoginBar onToggle={this.toggleFormHandler} isOpen={this.state.showForm}
         loginStatus={this.props.stateApp.isLogin} onToggleLoginStatus={this.toggleLoginStatus} 
         />
        <main>
          { this.props.children }
        </main>

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
    isLogin:(status)=>dispatch(isLogin(status)) 
  }
}

export default connect(mapStateToProps,mapDispatchToProps) (Layout)