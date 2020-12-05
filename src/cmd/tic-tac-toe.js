const Discord = require("discord.js");
let usersLvl = require('../common/usersLvl')
let profile = require('../data/profile.json')
let c = require('../data/constants.js')

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c] && squares[a] !== ' ') {
            return squares[a];
        }
    }

    return null;
}

const getTable = (a) => {
    return `\`\`\` ${a[0]} | ${a[1]} | ${a[2]} \n---|---|---\n ${a[3]} | ${a[4]} | ${a[5]} \n---|---|---\n ${a[6]} | ${a[7]} | ${a[8]} \n\`\`\``
}



exports.run = async (bot, msg, args) => {

    let one = '1⃣'
    let two = '2⃣'
    let three = '3⃣'
    let four = '4⃣'
    let five = '5⃣'
    let six = '6⃣'
    let seven = '7⃣'
    let eight = '8⃣'
    let nine = '9⃣'

    let xIsNext = true;

    let arrReaction = [
        '1⃣', '2⃣', '3⃣',
        '4⃣', '5⃣', '6⃣',
        '7⃣', '8⃣', '9⃣'
    ];

    let arrStart = [
        ' ', ' ', ' ',
        ' ', ' ', ' ',
        ' ', ' ', ' '
    ];

    let arrInfo = [
        '1', '2', '3',
        '4', '5', '6',
        '7', '8', '9'
    ];


    let embed = new Discord.MessageEmbed()
        .setColor('42aaff')
        .setTitle(`Крестики нолики`)
        .addField('Правила:', `Данно поле и номера для хода \n${getTable(arrInfo)}`)

    const times = await msg.channel.send(embed);
    try {
        await arrReaction.forEach(e => times.react(e))
    } catch (e){
        console.log(e)
    }

    let deletmsg = times;

    const result = async (reaction, user) => {

        if (user.id == 775753596217720862) return;

        deletmsg.delete()

        switch (reaction.emoji.name) {
            case one:
                arrStart.splice(0, 1, xIsNext ? 'x' : 'o')
                arrReaction.splice(arrReaction.indexOf(one), 1);
                break;
            case two:
                arrStart.splice(1, 1, xIsNext ? 'x' : 'o')
                arrReaction.splice(arrReaction.indexOf(two), 1);
                break;
            case three:
                arrStart.splice(2, 1, xIsNext ? 'x' : 'o')
                arrReaction.splice(arrReaction.indexOf(three), 1);
                break;
            case four:
                arrStart.splice(3, 1, xIsNext ? 'x' : 'o')
                arrReaction.splice(arrReaction.indexOf(four), 1);
                break;
            case five:
                arrStart.splice(4, 1, xIsNext ? 'x' : 'o')
                arrReaction.splice(arrReaction.indexOf(five), 1);
                break;
            case six:
                arrStart.splice(5, 1, xIsNext ? 'x' : 'o')
                arrReaction.splice(arrReaction.indexOf(six), 1);
                break;
            case seven:
                arrStart.splice(6, 1, xIsNext ? 'x' : 'o')
                arrReaction.splice(arrReaction.indexOf(seven), 1);
                break;
            case eight:
                arrStart.splice(7, 1, xIsNext ? 'x' : 'o')
                arrReaction.splice(arrReaction.indexOf(eight), 1);
                break;
            case nine:
                arrStart.splice(8, 1, xIsNext ? 'x' : 'o')
                arrReaction.splice(arrReaction.indexOf(nine), 1);
                break;
            default:
                break;
        }

        xIsNext = !xIsNext;

        if (calculateWinner(arrStart) !== null) {
            const resultGame = new Discord.MessageEmbed()
                .setColor('42aaff')
                .setTitle(`Победа`)
                .addField('Поле:', `${getTable(arrStart)}`)
                .addField('Победитель', `победил ${calculateWinner(arrStart)}`)

            return msg.channel.send(resultGame);
        }

        if (arrReaction.length === 0) {
            const resultGame = new Discord.MessageEmbed()
                .setColor('42aaff')
                .setTitle(`Конец игры`)
                .addField('Поле:', `${getTable(arrStart)}`)
                .addField('Ничья', 'Победила дружба ☻')

            return msg.channel.send(resultGame);
        }

        const nextR = new Discord.MessageEmbed()
            .setColor('42aaff')
            .setTitle(`Крестики нолики`)
            .addField('Игра:', getTable(arrStart))

        const game = await msg.channel.send(nextR);
        await arrReaction.forEach(e => game.react(e))
        deletmsg = game

        await game.awaitReactions(result, {});

    }

    await times.awaitReactions(result, {});
};

exports.help = {
    name: 'ttt',
    description: `Играйте с другом в крестики-нолики. `,
    usage: 'ttt'
};