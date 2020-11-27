
let lion_of_fire = [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkDs7E-VCthn9ezkZI8vhHaiKkKEI7F-Nzmg&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkJ8kI7hMGOwafsZblbox_6M-QKODvUG905w&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUY_-FCCDhxomgu2BHIIspDT-iDf0BeJ4R1Q&usqp=CAU',
    'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.alkd0V3mfTizth9N5ftxsgHaFj%26pid%3DApi&f=1',
    'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.tFtSlyZzAKgnWnUyrZlx9gHaEc%26pid%3DApi&f=1',
    'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.ewqI0quHpWr1ck3D8aTQ7QHaEo%26pid%3DApi&f=1',
    'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fgetwallpapers.com%2Fwallpaper%2Ffull%2Ff%2Fd%2F6%2F656292.jpg&f=1&nofb=1',
    'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.VPK-yG__QG6tHVhFiVCkbAHaEK%26pid%3DApi&f=1',
    'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.4QdoN76d6HxlmJ914uHf_QHaEK%26pid%3DApi&f=1',
    'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.tcXQ4uI6ioY7tt-TLcFLFAHaGk%26pid%3DApi&f=1',
    'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.lFZM-ejFWa2Kh_FvSIZIbQHaFM%26pid%3DApi&f=1',
    'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.7nLR1mKIbUrdIkQ2tEOicQHaEK%26pid%3DApi&f=1',
]

module.exports.run = async (bot, msg, args) => {
    let lof = lion_of_fire[Math.floor(Math.random() * lion_of_fire.length)];
    msg.channel.send(lof);
}

module.exports.help = {
    name: 'lion_of_fire',
    description: 'Повеселить lion_of_fire.',
    usage: 'lion_of_fire'
}