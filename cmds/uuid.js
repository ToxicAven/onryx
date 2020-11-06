var uuid = {
    custom: async function(Discord, message, fetch, args) {
        if (!args.length) {
            return message.channel.send('You need to specify a Player Name!');
        };
        
        const getuuid = await fetch(`https://api.mojang.com/users/profiles/minecraft/${args}`).then(response => response.json());
        const embed = new Discord.MessageEmbed()
        .setColor('#F531CA')
        .setTitle(getuuid.id)
        message.channel.send(embed); 
    }
}

module.exports = uuid