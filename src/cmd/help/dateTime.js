function msToTime(duration) {
    let seconds = Math.floor((duration / 1000) % 60)
    let minutes = Math.floor((duration / (1000 * 60)) % 60)
    let hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
    let day = Math.floor((duration / (1000 * 60 * 60 * 24)));

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    let txt = day === 1 ? ' день' : ' дня';
    switch (day) {
        case 0: txt = '';
            break;
        case 1: txt = `${day} день `;
            break;
        case 2:
        case 3:
        case 4:
            txt = `${day} дня `;
            break;
        default:
            txt = `${day} дней `;
            break;
    }

    return txt + hours + ":" + minutes + ":" + seconds;
}

module.exports = msToTime;