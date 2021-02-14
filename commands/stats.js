module.exports = {
    name: 'stats',
    aliases: ['s','sheet'],
    description: 'Provides a character sheet of the user.',
    args: false,
    usage: '<user/monster name>',
    guildOnly: false,
    cooldown: 5,
    execute(message, args, game) {
        const userName = (args[0] || message.author.username);
        if (!userName) {
            return;
        }
        const player = game.getPlayer(userName) || game.enemy.name;
        // const player = game.players.find(({ name }) => name === userName) || game.enemy.name;
        if (player) {
            const statSheet = [];
            const right = player.getEquipment('right');
            const left = player.getEquipment('left');
            const armor = player.getEquipment('armor');
            const ring = player.getEquipment('ring');
            statSheet.push("```css");
            statSheet.push(`Character name: ${player.name}`);
            statSheet.push(`Level: ${player.level}`);
            statSheet.push(`Hp: ${player.hp}/${player.hpMax} [+${player.equipmentStats.hpMax}]`);
            statSheet.push(`Attack: ${player.power} [+${player.equipmentStats.power}]`);
            statSheet.push(`Defense: ${player.defense} [+${player.equipmentStats.defense}]`);
            statSheet.push(`Speed: ${player.speed} [+${player.equipmentStats.speed}]`);
            statSheet.push(`Experience: ${player.exp}/${player.expNeeded}`);
            statSheet.push(`Gold: ${player.gold}`);
            statSheet.push(`-----------------------`);
            statSheet.push(`Right Hand: ${right.name}`);
            statSheet.push(`Left Hand: ${left.name}`);
            statSheet.push(`Armor: ${armor.name}`);
            statSheet.push(`Ring: ${ring.name}`);
            statSheet.push(`-----------------------`);
            statSheet.push(player.showInventory());
            statSheet.push("```");
            message.channel.send(statSheet);
        }
        else {
            message.channel.send(`Cannot find stats for ${userName}`);
        }
    },
};