const Discord = require('discord.js');

const sendMessage = function (channel, message) {
    filtered = filteredMessage(message);
    if (filtered.length > 0) {
        channel.send(filtered, { split: true });
    }
}

const filteredMessage = function (message) {
    //... Can use regex here
    // const re = /\s*(?:;|$)\s*/
    // const nameList = names.split(re)
    if (Array.isArray(message) && message.length > 0) {
        return message.filter(function (e) {
            return e != '' && e != ' ' && e != '\n' && e != ' \n';
        });
    }
    else if (message != '' && message != ' ' && message != '\n' && message != ' \n') {
        return [message];
    }
    return false;
}

module.exports = { sendMessage }


