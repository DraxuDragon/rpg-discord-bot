const { randomRange } = require('../lib/random.js');
const utils = require('../lib/utils');

//... This might turn into !use once base item class is setup
module.exports = {
    name: 'read',
    aliases: ['scroll'],
    description: 'Trys to cast a spell from a scroll consuming the scroll in the process.',
    args: true,
    usage: '',
    guildOnly: false,
    cooldown: 2,
    execute(message, args, game) {
        const dialog = [];
        const userName = message.author.username;
        if (!userName) {
            return;
        }
        const player = game.getPlayer(userName);
        if (!player) {
            dialog.push(`You don't seem to exist ${userName}. Maybe try the !init command?`);
            if(dialog.length) {
                utils.sendMessage(message.channel,dialog.join('\n'));
            }
            return;
        }
        if (player.dead) {
            dialog.push(`I'm sorry ${userName}, but you're dead. Maybe !rest awhile?`);
            utils.sendMessage(message.channel,dialog.join('\n'));
            return;
        }
        
        //... if (player.isTurn)
        if (!game.enemy || game.turn.userName === userName) {
            const scroll = player.getFromInventory(args[0],false);
            let target = false;

            if (!scroll) {
                dialog.push(`Can't find the scroll '${args[0]}' in your inventory.`)
                utils.sendMessage(message.channel,dialog.join('\n'));
                return;
            }
            if (!scroll.target[0]) {
                dialog.push('This scroll doesn\'t have a target.')
                utils.sendMessage(message.channel,dialog.join('\n'));
                return
            }
            if (scroll.target.find(e => e === 'enemy')) {
                target = game.enemy;
            }
            else if (scroll.target.find(e => e === 'player')) {
                target = (game.getPlayer(args[1])) ? game.getPlayer(args[1]) : player;
            }
            else {
                target = player;
            }

            const amount = randomRange(scroll.range.max,scroll.range.min);
            scroll.effects.forEach(effect => {
                if (effect.name === 'heal' && effect.uses > 0) {
                    dialog.push(target.heal(amount));
                    effect.uses--;
                    if (effect.uses <= 0) {
                        effect.uses = effect.usesMax;
                        player.getFromInventory(scroll.name);
                    }
                }
                else if (effect.name === 'burn' && effect.uses > 0) {
                    dialog.push(`A mote of flame burns ${target.name} for ${amount} damage.`);
                    dialog.push(target.damage(amount));
                    effect.uses--;
                    if (effect.uses <= 0) {
                        effect.uses = effect.usesMax;
                        player.getFromInventory(scroll.name);
                    }
                    //... TODO: Need to fix turn handling for scrolls.
                    dialog.push(game.updateCombat());
                }
            });


        }
        if(dialog.length) {
            utils.sendMessage(message.channel,dialog.join('\n'));
        }
    }
};
