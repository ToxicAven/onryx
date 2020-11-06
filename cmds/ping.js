      var ping = {
        custom: function(Discord, message) {
            const embed = new Discord.MessageEmbed()
      .setTitle("Ping")
      .addFields({ name: 'Bot => Discord', value: `${Math.round(bot.ws.ping)}ms`},)
      .setColor('#0099ff');
      message.channel.send(embed);
        }
    }
    
    module.exports = ping
