const Discord = require("discord.js");
const start = "⏳";
let usersLvl = require('../profile/usersLvl')
let profile = require('../profile/profile.json')
let c = require('../data/constants.js')


exports.run = async (bot, msg, args) => {
    const timefish = Math.floor(Math.random() * 20000);
    const uid = msg.author.id;

    const u = profile[uid];

    if (u.coins < c.fish) {
        return msg.channel.send(new Discord.MessageEmbed()
        .setColor('ff0000')
        .setTitle('Недостаточно монет.'));
    }

    usersLvl.setCoins(msg, c.fish)

    const times = await msg.channel.send('Подождите, пока пройдет время, и поймайте рыбу.');
    await times.react(start);
    await times.awaitReactions(reaction => reaction.emoji.name === start, { time: timefish });
    const coins = [1, 5, 10, 20, 40, 100]

    const temp = ['+', '-'];
    const fishs = [
        '🐟 Обычная Рыба',
        '🐠 Тропическая Рыба',
        '🐡 Иглобрюх',
        '🦈 Акула',
        '🐬 Дельфин',
        '🐳 Кит',
    ];

    let rnd = Math.floor(Math.random() * 101);
    let result1 = 0;
    if (rnd <= 20) result1 = 0;
    else if (rnd <= 45) result1 = 1;
    else if (rnd <= 80) result1 = 2;
    else if (rnd <= 90) result1 = 3;
    else if (rnd <= 99) result1 = 4;
    else if (rnd === 100) result1 = 5;

    usersLvl.addCoins(uid, coins[result1])

    let second = Math.floor(Math.random() * 999)
    let result2 = Math.floor((Math.random() * temp.length));
    let embed = new Discord.MessageEmbed()
        .setColor('42aaff')
        .setTitle('🎣 Рыбалка')
        .addField('Ты поймал:', fishs[result1], true)
        .addField('Время ушло:', timefish + ' мс', true)
        .addField('Информация:', `🐟 ${Math.floor(Math.random() * 10)},${second} кг\n📏 ${Math.floor(Math.random() * 50)},${second} см\n🌡️ ${temp[result2]}${Math.floor(Math.random() * 25)}°`)

    msg.channel.send(`${msg.author.username} получает ${coins[result1]} 🪙 , вот ваши результаты:`, embed);
};

exports.help = {
    name: 'fish',
    description: `Ловите свою рыбу на рыбалке. Цена одного заброса ${c.fish} 🪙 . `,
    usage: 'fish'
};