const messageRecieved = require('./help/api');


module.exports.run = async (bot, msg, args) => {
    messageRecieved('https://api.thedogapi.com/v1/images/search', msg);
}

module.exports.help = {
    name: 'dog'  ,
    description: 'Картинки с псами.',
    usage: 'dog'
}