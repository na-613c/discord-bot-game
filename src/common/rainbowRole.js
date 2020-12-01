const r_colors = ['#ec73a8', '#f29700', '#faef01', '#c1d500', '#9dd1a3', '#00a0ea', '#9fc3e7', '#b1569c'];
var r_place = 0;

const rainbowRole = (msg, bot) => {
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

module.exports = rainbowRole;