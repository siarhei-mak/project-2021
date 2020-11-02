import React from 'react';
import PropTypes from 'prop-types';
import {buttonsEvents} from './events';
import './EditClient.css';

class EditClient extends React.PureComponent {

    static propTypes = {
        client:PropTypes.shape({
            id: PropTypes.number.isRequired,
            fam: PropTypes.string.isRequired,
            im: PropTypes.string.isRequired,
            otch: PropTypes.string.isRequired,
            balance: PropTypes.number.isRequired,
          }),
      };


    state = {
        client: this.props.client,
    };

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
        let refs = {famRef: this.famRef, imRef:this.imRef, otchRef:this.otchRef, balanceRef:this.balanceRef, id: this.state.client.id};
        if (this.famRef != this.props.fam ) buttonsEvents.emit('editClientSaveButtonClicked', refs); //передаю в emit все рефы хэшем
    };
    emitCancelButtonClicked = () => { //кнопка "Закрыть" кликнута  - событие словит handler в MobileCompany
        buttonsEvents.emit('cancelButtonClicked');
    };


    render() {
        console.log(`EditClient - render (${this.state.client.id})`)
        return (
            <React.Fragment>
                <table className='EditClient'>
                    <caption>Редактирование клиента</caption>
                    <tbody>
                        <tr>
                            <td>Фамилия: </td>
                            <td><input type="text" defaultValue={this.state.client.fam} ref={this.setСlientFamRef} /></td>
                        </tr>
                        <tr>
                            <td>Имя: </td>
                            <td><input type="text" defaultValue={this.state.client.im} ref={this.setСlientImRef} /></td>
                        </tr>
                        <tr>
                            <td>Отчество: </td>
                            <td><input type="text" defaultValue={this.state.client.otch}  ref={this.setСlientOtchRef} /></td>
                        </tr>
                        <tr>
                            <td>Баланс: </td>
                            <td><input type="text" defaultValue={this.state.client.balance}  ref={this.setСlientBalanceRef} /></td>
                        </tr>
                        <tr>
                            <td colSpan="2" className="EditClient__buttons">
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

export default EditClient;
