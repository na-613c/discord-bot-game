const Discord = require("discord.js");
let usersLvl = require('../common/usersLvl')
let profile = require('../data/profile.json')
let c = require('../data/constants.js')


exports.run = async (bot, msg, args) => {

    let embed = new Discord.MessageEmbed()
        .setColor('42aaff')
        .setTitle(`Кости`)
        .addField('Правила:', 'Вы с дргом должны нажать на 🎲 и ожидать результатов броска каждого игрока.')
        .addField('Предупреждение', 'Перед нажатием вы должны отправить сообщение, если бот перезагружался.')

    const times = await msg.channel.send(embed);
    await times.react('🎲');

    const result = (reaction, user) => {
        let reactionArr = reaction.users.cache.map(a => ({ username: a.username, id: a.id }))
        reactionArr.splice(0, 1);
        let u = profile[user.id];
        if (u.coins < c.tota) {
            reaction.users.remove(user.id)
            return msg.channel.send(new Discord.MessageEmbed()
                .setColor('ff0000')
                .setTitle(`У ${user.username} едостаточно монет.`));
        }

        if (reaction.count === 3) {
            times.delete()

            let rnd = () => Math.floor(1 + Math.random() * 6);
            let score1 = rnd();
            let score2 = rnd();

            if (score1 === score2) {

                let standoff = new Discord.MessageEmbed()
                    .setColor('42aaff')
                    .setTitle(`Резльтаты игры`)
                    .addField(`${reactionArr[0].username}`, `выбрасывает ${score1}`)
                    .addField(`${reactionArr[1].username}`, `выбрасывает ${score2}`)
                    .addField('Ничья', `Количество 🪙 у игроков не изменилось`)

                return msg.channel.send(standoff);
            }

            usersLvl.addCoins(reactionArr[0].id, 0 - c.tota)
            usersLvl.addCoins(reactionArr[1].id, 0 - c.tota)

            const add = c.tota * 2
            
            let resultArr = (score1 > score2) ? reactionArr : [reactionArr[1], reactionArr[0]]

            usersLvl.addCoins(resultArr[0].id, add)

            let winnerMsg = new Discord.MessageEmbed()
                .setColor('42aaff')
                .setTitle(`Резльтаты игры`)
                .addField(`${reactionArr[0].username}`, `выбрасывает ${score1}`)
                .addField(`${reactionArr[1].username}`, `выбрасывает ${score2}`)
                .addField('Выиграл', `${resultArr[0].username} получает ${c.tota}🪙`)
                .addField('Проиграл', `${resultArr[1].username} теряет ${c.tota}🪙`)

            msg.channel.send(winnerMsg);
        }
    }

    await times.awaitReactions(result, {});
};

exports.help = {
    name: 'bones',
    description: `Тратьте свои 🪙 играя в кости. `,
    usage: 'bones'
};