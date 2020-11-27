const Discord = require('discord.js');
const fs = require('fs');
let config = require('./botconfig.json');
let usersLvl = require('./usersLvl')

const bot = new Discord.Client();
bot.comands = new Discord.Collection();
let token = config.token;
let prefix = config.prefix;



fs.readdir('./cmd/', (err, files) => {
    if (err) console.log(err);

    let jsFile = files.filter(f => f.split('.').pop() === 'js');

    if (jsFile.length <= 0) console.log("No comands")

    console.log(`загружено ${jsFile.length} команд`)

    jsFile.forEach((f, i) => {
        let props = require(`./cmd/${f}`);
        console.log(`${i + 1}.${f} загружено`);
        bot.comands.set(props.help.name, props);
    })

})

bot.on('ready', () => {
    console.log('I am ready!');
    bot.generateInvite(['ADMINISTRATOR']).then(link => console.log(link))
});

const r_colors = ['#ec73a8', '#f29700', '#faef01', '#c1d500', '#9dd1a3', '#00a0ea', '#9fc3e7', '#b1569c'];
var r_place = 0;

const rainbowRole = (msg) => {
    let guild = bot.guilds.cache.get('650668875431542784');
    let role = guild.roles.cache.find(role => role.name === 'RainbowRole');

    if (!!msg.member.roles.cache.find(role => role.name === 'RainbowRole')) {
        role.setColor(r_colors[r_place])
            .catch(console.log);
        if (r_place == (r_colors.length - 1)) {
            r_place = 0;
        } else {
            r_place++;
        }
    }
}



bot.on('message', async msg => {
    if (msg.author.bot) return;
    if (msg.channel.type == 'dm') return;

    usersLvl(msg);

    let user = msg.author.username;
    let userId = msg.author.id;

    let messageArray = msg.content.split(' ');
    let comand = messageArray[0].toLocaleLowerCase();
    let args = messageArray.slice(1);

    rainbowRole(msg);

    if (comand === '!help_') {
        let embed = new Discord.MessageEmbed()
            .setTitle('ИНФОРМАЦИЯ О КОМАНДАХ ДЛЯ БОТА :')
            .setColor('42aaff')

        bot.comands.forEach((e) => {
            embed.addField(e.help.name, `${prefix}${e.help.usage} - ${e.help.description}`)
        })

        msg.channel.send(embed);
    }


    if (!msg.content.startsWith(prefix)) return;

    let cmd = bot.comands.get(comand.slice(prefix.length))
    if (cmd) cmd.run(bot, msg, args);


});

bot.login(token);