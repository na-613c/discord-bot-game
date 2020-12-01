const Discord = require("discord.js");


const rules = async (bot) => {
    const channel = bot.channels.cache.get('782914765051265054')

    channel.bulkDelete(100).then(() => {
        return m => m.delete(3000);
    });

    let embed = new Discord.MessageEmbed()
        .setColor('42aaff')
        .setTitle(`Правила сервера. <:101:770006627599777873>`)
        .addField('Запрещено:', '1. Ненормативная лексика.\n2. Оскорбления.\n3. Контент 18+.\n4. Отсутствие субординации.')
        .addField('Наказание:', '1 раз - придупреждение\n2 раз - бан на 24 часа')

    let msg = embed;
    const times = await channel.send(msg.addField('Соглашаясь вы принимаете данные правила.', 'Для продолжения нажмите на ☑️'));
    await times.react('☑️');

    await times.awaitReactions((reaction, user) => {
        reaction.users.remove(user.id)

        const guild = bot.guilds.cache.get('650668875431542784');
        if (!guild) return console.log("Couldn't get the guild.");

        const role = guild.roles.cache.find(role => role.name === "участник сервера");

        reaction.message.guild.members.cache.get(user.id).roles.add(role)
        user.send(`${user.username} принимает правила!`, embed)
    }, { max: 2 });
}

module.exports = rules;