//To be implemented

var catgirl = {
    custom: function(message, Discord, fetch) {
        
        const caturl = await fetch(`https://nekos.life/api/neko`).then(response => response.json());
        const embed = new Discord.MessageEmbed()
            .setTitle("nya!~")
            .setImage(caturl.neko);
    message.channel.send(embed);
    }
}

module.exports = catgirl