const Discord = module.require('discord.js');
const msToTime = module.require('../help/dateTime.js');
let profile = require('../data/profile.json')


module.exports.run = async (bot, msg, args) => {

    const user = msg.mentions.users.first();
    let u = profile[user.id];
    let rainbowRole = (u.endTime > Date.now()) ? msToTime(u.endTime - Date.now()) : 'нет';
    let embed = new Discord.MessageEmbed()
        .setTitle('Посмотреть информацию о пользователе')
        .setColor('42aaff')
        .addField('Тэг', user.tag)
        .addField('ID:', user.id)
        .addField('Имя', user.username, true)
        .addField('Дескриминатор', user.discriminator, true)
        .addField('Уровень', `:medal: ${u.lvl}`)
        .addField('Радужная Роль ', ':alarm_clock: ' + rainbowRole)
        .setThumbnail(user.displayAvatarURL())

    msg.channel.send(embed);
}

module.exports.help = {
    name: 'user',
    description: 'Покажет информацию о выбранном пользователе.',
    usage: 'user [@пользователь]'
}