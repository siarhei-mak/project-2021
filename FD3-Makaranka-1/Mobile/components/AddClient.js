import React from 'react';
// import PropTypes from 'prop-types';
import {buttonsEvents} from './events';
import './AddClient.css';

class AddClient extends React.PureComponent {

    //рефы
    famRef = null; //реф input фамилия
    setСlientFamRef = (ref) => this.famRef=ref;

    imRef = null; //реф input имя
    setСlientImRef = (ref) => this.imRef=ref;

    otchRef = null; //реф input отчество
    setСlientOtchRef = (ref) => this.otchRef=ref;

    balanceRef = null; //реф input баланс
    setСlientBalanceRef = (ref) => this.balanceRef=ref;


    //выпуск событий
    emitSaveButtonClicked = () => { //кнопка "Сохранить" кликнута - событие словит handler в MobileCompany
        let refs = {famRef: this.famRef, imRef:this.imRef, otchRef:this.otchRef, balanceRef:this.balanceRef};
        buttonsEvents.emit('addClientSaveButtonClicked', refs); //передаю в emit все рефы хэшем
    };
    emitCancelButtonClicked = () => { //кнопка "Закрыть" кликнута  - событие словит handler в MobileCompany
        buttonsEvents.emit('cancelButtonClicked');
    };
    render() {
        console.log(`AddClient.js - render`)
        return (
            <React.Fragment>
                <table className='AddClient'>
                    <caption>Добавление клиента</caption>
                    <tbody>
                        <tr>
                            <td>Фамилия: </td>
                            <td><input type="text" defaultValue='' ref={this.setСlientFamRef} /></td>
                        </tr>
                        <tr>
                            <td>Имя: </td>
                            <td><input type="text" defaultValue='' ref={this.setСlientImRef} /></td>
                        </tr>
                        <tr>
                            <td>Отчество: </td>
                            <td><input type="text" defaultValue=''  ref={this.setСlientOtchRef} /></td>
                        </tr>
                        <tr>
                            <td>Баланс: </td>
                            <td><input type="text" defaultValue=''  ref={this.setСlientBalanceRef} /></td>
                        </tr>
                        <tr>
                            <td colSpan="2" className="AddClient__buttons">
                                <input type="button" value="Сохранить" onClick={this.emitSaveButtonClicked} />
                                <input type="button" value="Закрыть" onClick={this.emitCancelButtonClicked} />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </React.Fragment>
        );
    }
}


export default AddClient;
