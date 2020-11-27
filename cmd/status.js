module.exports.run = async (bot, msg, args) => {
    const status = args.join(' ');
    if (!status) return msg.channel.send('Укажи новый статус!');
    bot.user.setActivity(status, { type: 'PLAYING' }); // PLAYING, WATCHING, LISTENING и STREAMING ( url: 'https://twitch.tv/twitch') 
    msg.channel.send(`Статус успешно изменён на **${status}**!`);
};
module.exports.help = {
    name: 'setstatus',
    description: 'Для админа.',
    usage: 'setstatus [статус]'
};