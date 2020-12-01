let profile = require('../data/profile.json')
let c = require('../data/constants.js')
const fs = require('fs');
const Discord = module.require('discord.js');


const writeInProfile = (profileData) => {
    fs.writeFile('./src/data/profile.json', JSON.stringify(profileData), err => {
        if (err) console.log("ERROR___",err)
    })
}

const addRole = (u, msg) => {
    const role = msg.guild.roles.cache.find(role => role.name === "RainbowRole");

    if ((u.coins - c.RainbowRole) >= 0) {
        u.coins -= c.RainbowRole;

        let day = 86400000;
        if (u.endTime > Date.now()) {
            u.endTime = u.endTime + day;
        } else {
            u.endTime = Date.now() + day;
        }
        msg.member.roles.add(role);
    }
}

const roleIsEmpty = (msg) => {
    const role = msg.guild.roles.cache.find(role => role.name === "RainbowRole");
    msg.member.roles.remove(role);
    const user = msg.author.username;

    const embed = new Discord.MessageEmbed()
        .setColor('ff0000')
        .setTitle(`У ${user} роль истекла.`)

    msg.channel.send(embed);
}

const usersLvl = {
    onMessage: (msg) => {
        const uid = msg.author.id;

        if (!profile[uid]) {
            profile[uid] = {
                coins: 10,
                endTime: 0,
                xp: 0,
                lvl: 0,
            };
        }
        let u = profile[uid];

        u.coins++;
        u.xp++;

        if (u.xp >= (u.lvl * 100)) {
            u.xp = 0;
            u.lvl++;
        }
        if (u.endTime < Date.now() && !!msg.member.roles.cache.find(role => role.name === 'RainbowRole')) roleIsEmpty(msg)

        writeInProfile(profile)
    },
    setCoins: (msg, price) => {
        const uid = msg.author.id;

        if (!profile[uid]) {
            profile[uid] = {
                coins: 10,
                endTime: 0,
                xp: 0,
                lvl: 0,
            };
        }
        let u = profile[uid];

        price === c.RainbowRole && addRole(u, msg)
        if (price === c.fish) {
            u.coins = u.coins - c.fish;
        }

        writeInProfile(profile)
    },
    addCoins: (uid, price) => {

        if (!profile[uid]) {
            profile[uid] = {
                coins: 10,
                endTime: 0,
                xp: 0,
                lvl: 0,
            };
        }
        let u = profile[uid];
        u.coins += price;
        writeInProfile(profile)
    },

}

module.exports = usersLvl;