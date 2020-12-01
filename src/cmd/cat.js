const messageRecieved = require('./help/api');


module.exports.run = async (bot, msg, args) => {
    messageRecieved('https://api.thecatapi.com/v1/images/search', msg);
}

module.exports.help = {
    name: 'cat',
    description: 'Картинки с котиками.',
    usage: 'cat'
}