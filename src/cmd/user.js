const Discord = module.require('discord.js');
const msToTime = module.require('../help/dateTime.js');
let profile = require('../data/profile.json')


const dateConverter = (d) => {

    let day = d.getDate() < 10 ? `0${d.getDate()}` : d.getDate();
    let month = d.getMonth() + 1 < 10 ? `0${d.getMonth() + 1}` : d.getMonth() + 1;
    let hours = d.getHours() < 10 ? `0${d.getHours()}` : d.getHours();
    let minutes = d.getMinutes() < 10 ? `0${d.getMinutes()}` : d.getMinutes();

    return `${day}-${month}-${d.getFullYear()} ${hours}:${minutes}`
}

module.exports.run = async (bot, msg, args) => {

    const user = msg.mentions.users.first();
    let u = profile[user.id];
    let rainbowRole = (u.endTime > Date.now()) ? msToTime(u.endTime - Date.now()) : 'нет';
    let guild = bot.guilds.cache.get('650668875431542784');

    const role = (id) => guild.roles.cache.find(role => role.id === id).name;

    let dateTime = new Date(user.createdAt)
    let addDT = new Date(guild.member(user).joinedTimestamp)

    let roles = guild.member(user)._roles.map(id => role(id)).reduce((s, n) => `${s}, ${n}`)

    let embed = new Discord.MessageEmbed()
        .setTitle('Посмотреть информацию о пользователе')
        .setColor('42aaff')
        .addField('Тэг', user.tag)
        .addField('ID:', user.id)
        .addField('Имя', user.username, true)
        .addField('Дескриминатор', user.discriminator, true)
        .addField('Уровень', `🏅 ${u.lvl}`)
        .addField('Дата создания акаунта:', `🗓️ ${dateConverter(dateTime)}`, true)
        .addField('Дата подключения:', `🗓️ ${dateConverter(addDT)}`)
        .addField('Радужная Роль ', `⏰ ${rainbowRole}`)
        .addField('Роли', `📝 \`${roles}\``)

        .setThumbnail(user.displayAvatarURL())
        .setImage('https://acegif.com/wp-content/uploads/starfall-gif.gif')



    msg.channel.send(embed);
}

module.exports.help = {
    name: 'user',
    description: 'Покажет информацию о выбранном пользователе.',
    usage: 'user [@пользователь]'
}