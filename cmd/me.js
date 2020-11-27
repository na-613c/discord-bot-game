const Discord = module.require('discord.js');
let profile = require('../profile.json')


module.exports.run = async (bot, msg, args) => {

    let user = msg.author.username;
    let userId = msg.author.id;

    let u = profile[userId];

    let embed = new Discord.MessageEmbed()
        .setColor('42aaff')
        .setTitle(`ИНФОРМАЦИЯ О ${user}`)
        .addField('Уровень', u.lvl + '')
        .addField('Опыта до уровня', ((u.lvl * 100 - u.xp) + ''))
        .addField('Монеты', `${u.coins} 💰`)
        .setThumbnail(user.avatarURL)


    msg.channel.send(embed);
}

module.exports.help = {
    name: 'me',
    description: 'Информация о пользователе.',
    usage: 'me'
}