const Discord = module.require('discord.js');
const msToTime = module.require('./help/dateTime.js');
let profile = require('../profile.json')


module.exports.run = async (bot, msg, args) => {

    const user = msg.mentions.users.first();
    let u = profile[user.id];

    let rainbowRole = (u.endTime > Date.now()) ? msToTime(u.endTime - Date.now()) : 'нет';

    let embed = new Discord.MessageEmbed()
        .setTitle('ИНФОРМАЦИЯ О ПОЛЬЗОВАТЕЛЕ')
        .setColor('42aaff')
        .addField('Имя', user.username)
        .addField('Тэг', user.tag)
        .addField('Дескриминатор', user.discriminator)
        .addField('Уровень', u.lvl)
        .addField('Радужная Роль ', rainbowRole)
        .setThumbnail(user.displayAvatarURL())

    msg.channel.send(embed);
}

module.exports.help = {
    name: 'user',
    description: 'Покажет информацию о выбранном пользователе.',
    usage: 'user [@пользователь]'
}