const EventEmitter = require('events');
const messageEmitter = new EventEmitter();

messageEmitter.on('message_call', (route) => {
    console.log('je suis le message émetteur ' + route)
})

module.exports = messageEmitter;