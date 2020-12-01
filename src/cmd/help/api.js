const r2 = require('r2');

async function messageRecieved(_url, msg) {
    try {
        var images = await loadImage(_url);
        var image = images[0].url;
        msg.channel.send(image)
    } catch (e) {
        console.log(e)
    }
}

async function loadImage(_url) {
    try {
        var response = await r2.get(_url, {}).json
    } catch (e) {
        console.log(e)
    }
    return response;
}

module.exports = messageRecieved;