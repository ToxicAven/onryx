var mcskin = {
    custom: async function(Discord, message, fetch, args) {
        if (!args.length) {
            return message.channel.send('You need to specify a Player Name!');
    };
        const uuid = await fetch(`https://api.mojang.com/users/profiles/minecraft/${args}`).then(response => response.json());
        const skin = ('https://minotar.net/armor/body/' + uuid.id + '/256.png');
        const embed = new Discord.MessageEmbed()
            .setTitle(`${args}`)
            .setColor('#F531CA')
            .setImage(skin);
    message.channel.send(embed);
    }
}

module.exports = mcskin