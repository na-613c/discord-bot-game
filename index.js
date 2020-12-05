const Discord = require('discord.js');
const fs = require('fs');
let config = require('./botconfig.json');
let usersLvl = require('./src/common/usersLvl')
let rules = require('./src/common/rules')
let rainbowRole = require('./src/common/rainbowRole')


const bot = new Discord.Client();
bot.comands = new Discord.Collection();
bot.hidecomands = new Discord.Collection();
let token = config.token;
let prefix = config.prefix;



fs.readdir('./src/cmd/', (err, files) => {
    if (err) console.log(err);

    let jsFile = files.filter(f => f.split('.').pop() === 'js');

    if (jsFile.length <= 0) console.log("No comands")

    console.log(`загружено ${jsFile.length} команд`)

    jsFile.forEach((f, i) => {
        let props = require(`./src/cmd/${f}`);
        console.log(`${i + 1}.${f} загружено`);
        bot.comands.set(props.help.name, props);
    })

})


fs.readdir('./src/hidecmd/', (err, files) => {
    if (err) console.log(err);

    let jsFile = files.filter(f => f.split('.').pop() === 'js');

    if (jsFile.length <= 0) console.log("No comands")

    console.log(`загружено hidecmd ${jsFile.length} команд`)

    jsFile.forEach((f, i) => {
        let props = require(`./src/hidecmd/${f}`);
        console.log(`${i + 1}.${f} загружено`);
        bot.hidecomands.set(props.help.name, props);
    })

})

bot.on('ready', () => {
    console.log('I am ready!');
    bot.generateInvite(['ADMINISTRATOR']).then(link => console.log(link))
    bot.channels.cache.get('760874962701254678').send('Бот запущен');
    rules(bot)
});


bot.on('message', async msg => {
    if (msg.author.bot) return;
    if (msg.channel.type == 'dm') return;

    usersLvl.onMessage(msg);

    let user = msg.author.username;
    let userId = msg.author.id;

    let messageArray = msg.content.split(' ');
    let comand = messageArray[0].toLocaleLowerCase();
    let args = messageArray.slice(1);

    rainbowRole(msg, bot);

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
    let arrayComands = bot.comands.concat(bot.hidecomands)
    let cmd = arrayComands.get(comand.slice(prefix.length))

    if (cmd) cmd.run(bot, msg, args);
});


bot.login(token);



