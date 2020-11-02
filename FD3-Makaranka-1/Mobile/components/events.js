import {EventEmitter} from 'events';
let buttonsEvents=new EventEmitter();
// в потоке voteEvents будут все события
//событие "editButtonClicked" - кликнута кнопка editButton (в MobileClient.js)
//событие ""
export {buttonsEvents};
