const Discord = module.require('discord.js');
let profile = require('../profile/profile.json')
const msToTime = module.require('./help/dateTime.js');


module.exports.run = async (bot, msg, args) => {

    let user = msg.author.username;
    let u = profile[msg.author.id];
    let rainbowRole = (u.endTime > Date.now()) ? msToTime(u.endTime - Date.now()) : 'нет';

    let embed = new Discord.MessageEmbed()
        .setColor('42aaff')
        .setTitle(`Информация о ${user} `)
        .addField('Уровень', ':medal: ' + u.lvl)
        .addField('Опыта до уровня', `:books: ${((u.lvl * 100 - u.xp))}`)
        .addField('Монеты', `:coin: ${u.coins} `)
        .addField('Радужная Роль ', ':alarm_clock: ' + rainbowRole)
        .setThumbnail(msg.author.displayAvatarURL())

    msg.channel.send(embed);
}

module.exports.help = {
    name: 'me',
    description: 'Посмотреть информацию о себе.',
    usage: 'me'
}