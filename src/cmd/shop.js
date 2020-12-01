const Discord = module.require('discord.js');
let profile = require('../data/profile.json')
let usersLvl = require('./../common/usersLvl')
let c = require('../data/constants.js')


module.exports.run = async (bot, msg, args) => {
    const user = msg.author.username;
    const userId = msg.author.id;
    const u = profile[userId];

    let embed = new Discord.MessageEmbed().setColor('42aaff');

    if (u.coins >= c.RainbowRole) {
        usersLvl.setCoins(msg, c.RainbowRole)
        embed.setTitle(`${user} купил роль за ${c.RainbowRole} монет`)
    } else {
        embed.setTitle(`У ${user} не достаточно монет, что бы купить роль необходимо ${c.RainbowRole} монет`)
    }

    msg.channel.send(embed);
}

module.exports.help = {
    name: 'shop',
    description: `Покупка "радужной роли" на 1 сутки за ${c.RainbowRole} 🪙.`,
    usage: 'shop'
}