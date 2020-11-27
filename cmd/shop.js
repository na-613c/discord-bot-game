const Discord = module.require('discord.js');
let profile = require('../profile.json')
let usersLvl = require('./../usersLvl')


module.exports.run = async (bot, msg, args) => {
    const price = 100;
    const user = msg.author.username;
    const userId = msg.author.id;
    const u = profile[userId];

    let embed = new Discord.MessageEmbed().setColor('42aaff');

    if (u.coins >= price) {
        usersLvl(msg, price)
        embed.setTitle(`${user} купил роль за ${price}`)
    } else {
        embed.setTitle(`У ${user} не достаточно монет, что бы купить роль за ${price} монет`)
    }

    msg.channel.send(embed);
}

module.exports.help = {
    name: 'shop',
    description: 'Покупка "радужной роли" на 1 сутки',
    usage: 'shop'
}