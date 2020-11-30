const Discord = require("discord.js");


module.exports.run = async (bot, msg, args) => {

    msg.channel.bulkDelete(100).then(() => {
        return m => m.delete(3000);
    });

    let embed = new Discord.MessageEmbed()
        .setColor('42aaff')
        .setTitle(`Правила сервера. <:101:770006627599777873>`)
        .addField('Запрещено:', '1. Ненормативная лексика.\n2. Оскорбления.\n3. Контент 18+.\n4. Отсутствие субординации.')
        .addField('Наказание:', '1 раз - придупреждение\n2 раз - бан на 24 часа')
        .addField('Соглашаясь вы принимаете данные правила.', 'Для продолжения нажмите на ☑️')

    const times = await msg.channel.send(embed);
    await times.react('☑️');

    await times.awaitReactions((reaction, user) => {
        reaction.users.remove(user.id)
        const role = msg.guild.roles.cache.find(role => role.name === "участник сервера");
        reaction.message.guild.members.cache.get(user.id).roles.add(role)
        user.send(`${user.username} принимает правила!`, embed)
    }, {});
}

module.exports.help = {
    name: 'rules',
    description: 'Правила.',
    usage: 'rules'
}



