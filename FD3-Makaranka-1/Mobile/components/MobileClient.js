import React from 'react';
import PropTypes from 'prop-types';
import {buttonsEvents} from './events';
import './MobileClient.css';

class MobileClient extends React.PureComponent {

  static propTypes = {
    info:PropTypes.shape({
      id: PropTypes.number.isRequired,
      fam: PropTypes.string.isRequired,
      im: PropTypes.string.isRequired,
      otch: PropTypes.string.isRequired,
      balance: PropTypes.number.isRequired,
    }),
  };

  emitEditButtonClicked = () => {
    buttonsEvents.emit('editButtonClicked',this.props.info.id);
  }

  emitDeleteButtonClicked=()=>{
    buttonsEvents.emit('deleteButtonClicked',this.props.info.id);
  }

  render() {
    console.log("MobileClient.js - render (id="+this.props.info.id+")");

    return (
        <tr className='MobileClient'>
            <td>{this.props.info.fam}</td>
            <td>{this.props.info.im}</td>
            <td>{this.props.info.otch}</td>
            <td>{this.props.info.balance}</td>
            {this.props.info.balance>0 ? <td className="MobileClient__active">active</td>: <td className="MobileClient__blocked">blocked</td> }
            <td><input type="button" value="Редактировать" onClick={this.emitEditButtonClicked} /></td>
            <td><input type="button" value="Удалить" onClick={this.emitDeleteButtonClicked} /></td>
        </tr>
    );

  }
}

export default MobileClient;
