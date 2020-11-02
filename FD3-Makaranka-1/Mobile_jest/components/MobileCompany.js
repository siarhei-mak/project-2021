import React from 'react';
import PropTypes from 'prop-types';

import {buttonsEvents} from './events';
import MobileClient from './MobileClient';
import EditClient from './EditClient';
import AddClient from './AddClient';

import './MobileCompany.css';

class MobileCompany extends React.PureComponent {

    static propTypes = {
        testMode: PropTypes.bool.isRequired,
        clients:PropTypes.arrayOf(
          PropTypes.shape({
            id: PropTypes.number.isRequired,
            fam: PropTypes.string.isRequired,
            im: PropTypes.string.isRequired,
            otch: PropTypes.string.isRequired,
            balance: PropTypes.number.isRequired,
          })
        ),
    };

    state = {
        testMode: this.props.testMode,
        clients: this.props.clients,
        currentClient: null,
        clientsFilterMode: 0, // режимы фильтрации: 0 - Все, 1 - активные, 2 - заблокированные
        appMode: 0, // режим отображения: 0 - по умолчанию, 1 - режим редактирования (EditClient), 2 - режим добавления (AddClient)
        clickedElementClientId: null, // id элемента с которым было выполнено действие
    };

    componentDidMount = () => {
        buttonsEvents.addListener('editButtonClicked', this.showEditClientMode); //подписка на onClick по кнопке "Редактировать"
        buttonsEvents.addListener('addClientButtonClicked',this.showAddClientMode); //подписка на onClick по кнопке "Добавить клиента"
        buttonsEvents.addListener('cancelButtonClicked',this.hideEditAddMode); //подписка на onClick по кнопке "Закрыть" в компоненте editClient и addClient

        buttonsEvents.addListener('filterAllButtonClicked',this.filterClientsAll); //подписка на onClick по кнопки "Все"
        buttonsEvents.addListener('filterActiveButtonClicked',this.filterClientsActive); //подписка на onClick по кнопки "Активные"
        buttonsEvents.addListener('filterBlockedButtonClicked',this.filterClientsBlocked); //подписка на onClick по кнопки "Заблокированные"

        buttonsEvents.addListener('editClientSaveButtonClicked',this.saveEditedClient); //подписка на onClick по кнопке "Сохранить" в компоненте editClient
        buttonsEvents.addListener('addClientSaveButtonClicked',this.saveAddedClient); //подписка на onClick по кнопке "Сохранить" в компоненте addClient
        buttonsEvents.addListener('deleteButtonClicked',this.deleteClient); //подписка на onClick по кнопке "удалить" в компоненте MobileClient
    };
    
    componentWillUnmount = () => {
        buttonsEvents.removeListener('editButtonClicked',this.showEditClientMode); //отписка от onClick по кнопке "Редактировать"
        buttonsEvents.removeListener('addClientButtonClicked',this.showAddClientMode); //отписка от onClick по кнопке "Добавить клиента"
        buttonsEvents.removeListener('cancelButtonClicked',this.hideEditAddMode); //отписка от onClick по кнопке "Закрыть" в компоненте editClient и addClient

        buttonsEvents.removeListener('filterAllButtonClicked',this.filterClientsAll); //отписка от onClick по кнопки "Все"
        buttonsEvents.removeListener('filterActiveButtonClicked',this.filterClientsActive); //отписка от onClick по кнопки "Активные"
        buttonsEvents.removeListener('filterBlockedButtonClicked',this.filterClientsBlocked); //отписка от onClick по кнопки "Заблокированные"

        buttonsEvents.removeListener('editClientSaveButtonClicked',this.saveEditedClient); //отписка от onClick по кнопке "Сохранить" в компоненте editClient
        buttonsEvents.removeListener('addClientSaveButtonClicked',this.saveAddedClient); //отписка от onClick по кнопке "Сохранить" в компоненте addClient
        buttonsEvents.removeListener('deleteButtonClicked',this.deleteClient); //отписка от onClick по кнопке "удалить" в компоненте MobileClient
    };

    // emit-events
    emitFilterAllButtonClicked = () => {  //событие клика кнопок "Все"
        buttonsEvents.emit('filterAllButtonClicked');
    };

    emitFilterActiveButtonClicked = () => {  //событие клика кнопок "Активные"
        buttonsEvents.emit('filterActiveButtonClicked');
    };

    emitFilterBlockedButtonClicked = () => {  //событие клика кнопок "Заблокированные"
        buttonsEvents.emit('filterBlockedButtonClicked');
    };

    emitAddClientButtonClicked = () => {  //событие клика кнопки "Добавить клиента"
        buttonsEvents.emit('addClientButtonClicked');
    };

    // receive-events
    showEditClientMode = (id) => { //обработка клика по кнопке "Редактировать"
        // в тестовом режиме имитируется id == 101 (первый в списке Иванов) 
        if (this.state.testMode === true) {
            id = 101; // 101 -клиент Иванов	Иван Иванович
        }
        this.setState({clickedElementClientId: id, appMode: 1}); //запомнить id элемента и перейти в режим редактирования
    };

    showAddClientMode = () => { //обработка клика по кнопке "Добавить клиента"
        this.setState({appMode: 2}); //перейти в режим добавления
    };

    hideEditAddMode = () => {
        this.setState({clickedElementClientId: null, appMode: 0}); //перейти в обычный режим
    }


    filterClientsAll = () => { //обработка клика по кнопкам "Все"
        this.setState({clientsFilterMode: 0}); //переключить фильтр в режим "Все" (0)
    };

    filterClientsActive = () => { //обработка клика по кнопкам "Активные"
        this.setState({clientsFilterMode: 1}); //переключить фильтр в режим "Активные" (1)
    };

    filterClientsBlocked = () => { //обработка клика по кнопкам "Заблокированные"
        this.setState({clientsFilterMode: 2}); //переключить фильтр в режим "Заблокированные" (2)
    };

    //логика сохранения отредактированного клиента
    saveEditedClient = (refs) => {
        //блок кода тестирования 
        //имитация рефов, сработает только в тестовом режиме 
        if (this.state.testMode === true) {
            refs = {
                id: 101,
                famRef: {value: 'editedFam'},
                imRef: {value: 'editedIm'},
                otchRef: {value: 'editedOtch'},
                balanceRef: {value: 111}
            }
        }
        //конец блока код для тестирования
        
        let newClients = [...this.state.clients];
        let changed = false; // признак, что-то изменилось и можно сохранить изменения

        let famRef = refs.famRef.value; //сохраняем value рефов
        let imRef = refs.imRef.value;
        let otchRef = refs.otchRef.value;
        let balanceRef = Number(refs.balanceRef.value);


        newClients.forEach((client, index)=>{
            if(client.id == refs.id) {
                if( client.fam !== famRef || client.im !== imRef || client.otch !== otchRef || client.balance !== balanceRef ){
                    let newClient = {...client};

                    newClient.fam = refs.famRef.value;
                    newClient.im = refs.imRef.value;
                    newClient.otch = refs.otchRef.value;
                    newClient.balance = Number(refs.balanceRef.value);

                    newClients[index] = newClient;

                    changed = true;
                }
            }
        });
        if ( changed ) { //изменения есть, сохранить
            this.setState({clients:newClients, appMode: 0});
        } else { //изменений нет, сохранять нечего
            this.setState({appMode: 0});
        }
    };

    saveAddedClient = (refs) => { //логика сохранения добавленного клиента
        //блок тестирования 
        //имитация рефов, сработает в тестовом режиме 
        if (this.state.testMode === true) {
            refs = {
                famRef: {value: 'addedClient'},
                imRef: {value: 'addedIm'},
                otchRef: {value: 'addedOtch'},
                balanceRef: {value: 111}
            }
        }
        //конец блока для тестирования 
        let newClients = [...this.state.clients];
        let incrementedId; //автоинкремент ID (он же key)
        if(newClients.length>0) {
            incrementedId = newClients.reverse((a,b)=>a.id-b.id)[0].id + 1; //id - больший id + 1
        } else {
            incrementedId = 1; //если список пустой, то считать от единицы
        }

        let balanceToNum = Number(refs.balanceRef.value);
        let newClient = {id:incrementedId, fam: refs.famRef.value, im: refs.imRef.value, otch: refs.otchRef.value, balance: balanceToNum}; 
        
        newClients=[...this.state.clients, newClient];

        this.setState({clients:newClients, appMode: 0});
    }

    deleteClient = (id) => { //логика удаления клиента
        //блок кода тестирования
        //имитация удаления в тесте
        if (this.state.testMode === true) {
            id = 101; // 101 -клиент Иванов	Иван Иванович
        }
        //конец блока кода тестирования
        let newClients=[...this.state.clients];
        newClients = newClients.filter(client => client.id != id);
        this.setState({clients:newClients, appMode: 0});
    };

    render() {
        // console.log('MobileCompany.js - render')

        let clientsCode; //переменная для jsx кода клиентов
        //фильтрация клиентов

        (this.state.clientsFilterMode == 0) && ( clientsCode = this.state.clients.map(client => //если режим фильтра == 0
            <MobileClient key={client.id} info={client} />) //отображаем всех клиентов
        );
        (this.state.clientsFilterMode == 1) && ( clientsCode=this.state.clients.map(client =>  //если режим фильтра == 1
            client.balance > 0 && <MobileClient key={client.id} info={client} />) //отображаем активных клиентов
        );
        (this.state.clientsFilterMode == 2) && ( clientsCode=this.state.clients.map(client => //если режим фильтра == 2 
            client.balance <= 0 && <MobileClient key={client.id} info={client} />) //отображаем заблокированных клиентов
        );

        let newClients = [...this.state.clients];
        let editedClientArr = newClients.filter(client => client.id == this.state.clickedElementClientId);
        let currentClient = editedClientArr[0];


        return (
            <div className='MobileCompany'>
                
                <div className='MobileCompany__clients-filter'>
                    <input type="button" name='all' value="Все" onClick={this.emitFilterAllButtonClicked} />
                    <input type="button" name='active' value="Активные" onClick={this.emitFilterActiveButtonClicked} />
                    <input type="button" name='blocked' value="Заблокированные" onClick={this.emitFilterBlockedButtonClicked} />
                </div>

                <div className='MobileCompany__table'>
                    <table>
                        <caption>{this.props.shopName}</caption>
                        <thead>
                            <tr>
                                <td>Фамилия</td>
                                <td>Имя</td>
                                <td>Отчество</td>
                                <td>Баланс</td>
                                <td>Статус</td>
                                <td>Редактировать</td>
                                <td>Удалить</td>
                            </tr>
                        </thead>
                        <tbody>
                            {clientsCode}
                        </tbody>
                    </table>
                </div>

                {this.state.appMode==0 && <div className='MobileCompany__add-button'><input type="button" value="Добавить клиента" onClick={this.emitAddClientButtonClicked} /></div>}
                {this.state.appMode==1 && <EditClient key={currentClient.id} client={currentClient}/>}
                {this.state.appMode==2 && <AddClient />}

            </div>
        );
    }

}
export default MobileCompany;