const Discord = require("discord.js");


exports.run = async (bot, message, args) => {
    if (!args[0]) return message.reply("Пожалуйста, задайте полный вопрос");
    let replies = [
        'Бесспорно.',
        'Предрешено.',
        'Никаких сомнений.',
        'Определённо да.',
        'Можешь быть уверен в этом.',
        'Мне кажется да.',
        'Вероятнее всего.',
        'Хорошие перспективы.',
        'Знаки говорят да.',
        'Да',
        'Пока не ясно, попробуй снова.',
        'Спроси позже.',
        'Лучше не рассказывать.',
        'Сейчас нельзя предсказать.',
        'Сконцентрируйся и спроси опять.',
        'Даже не думай.',
        'Мой ответ нет.',
        'По моим данным нет.',
        'Перспективы не очень хорошие.',
        'Весьма сомнительно.',
        'Нет'
    ];

    let result = Math.floor((Math.random() * replies.length));
    let question = args.slice(0).join(" ");

    let embed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setTitle('🎱 Волшебный Шар!')
        .addField('Вопрос:', question, true)
        .addField('Ответ:', replies[result], true)

    message.channel.send(embed);
};

exports.help = {
    name: 'ball',
    description: 'Задайте боту вопрос.',
    usage: 'ball [Вопрос]'
};