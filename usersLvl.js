let profile = require('./profile.json')
let dt = require('./cmd/help/dateTime')

const fs = require('fs');
const Discord = module.require('discord.js');

const usersLvl = (msg, price = 0) => {
    const uid = msg.author.id;
    const role = msg.guild.roles.cache.find(role => role.name === "RainbowRole");

    if (!profile[uid]) {
        profile[uid] = {
            coins: 10,
            endTime: 0,
            xp: 0,
            lvl: 0,
        };
    }

    let u = profile[uid];

    if (price === 0) {
        u.coins++;
        u.xp++;

        if (u.xp >= (u.lvl * 100)) {
            u.xp = 0;
            u.lvl++;
        }

        if (u.endTime < Date.now() && !!msg.member.roles.cache.find(role => role.name === 'RainbowRole')) {
            msg.member.roles.remove(role);
            const user = msg.author.username;
            const embed = new Discord.MessageEmbed()
                .setColor('ff0000')
                .setTitle(`У ${user} роль истекла.`)

            msg.channel.send(embed);
        }

    } else {
        if ((u.coins - price) >= 0) {
            u.coins -= price;

            let day = 86400000;
            if (u.endTime > Date.now()) {
                u.endTime = u.endTime + day;
            } else {
                u.endTime = Date.now() + day;
            }

            msg.member.roles.add(role);
        }
    }


    fs.writeFile('profile.json', JSON.stringify(profile), err => {
        if (err) console.log(err)
    })
};

module.exports = usersLvl;