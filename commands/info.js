const { sendMessage } = require('../lib/utils');

module.exports = {
    name: 'info',
    aliases: ['?', 'desc', 'description'],
    description: 'Shows information about an item.',
    args: true,
    usage: '<<item name>>',
    guildOnly: false,
    cooldown: 1,
    execute(message, args, game) {
        const dialog = [];
        const userName = message.author.username;
        if (!userName) {
            return;
        }

        const player = game.getPlayer(userName);
        if (!player) {
            dialog.push(`You don't seem to exist ${userName}. Maybe try the !init command?`);
            sendMessage(message.channel, dialog.join('\n'));
            return;
        }

        const item = player.getFromInventory(args[0], false);
        if (!item) {
            dialog.push(`Can't find the item '${args[0]}' in your inventory.`)
            sendMessage(message.channel, dialog.join('\n'));
            return;
        }

        dialog.push(item.description);
        if (dialog.length) {
            sendMessage(message.channel, dialog.join('\n'));
        }
    }
}