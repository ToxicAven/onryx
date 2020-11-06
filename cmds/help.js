const prefix = '^';

var commandsList = [
    prefix + "version - Displays version of bot",
    prefix + "help - Displays this message",
    prefix + "uuid - Display a Minecraft Usernames UUID",
    prefix + "uwu - Make your message super cute!",
    prefix + "hyonline - Checks A players Hypixel status, and location if Online",
    prefix + "2b2t - Checks Stats of The 2B2T Minecraft Server",
    prefix + "ping - Checks the Bots Connection to Discord API",
    prefix + "catgirl - Random Catgirl Pic. uwu",
    prefix + "watchdog - Check Past day, Minute, and All time Bans by Watchdog AC"
]

var help = {
    custom: function(Discord, message) {
        const embed = new Discord.MessageEmbed()
            .setTitle("Commands")
            .setDescription(commandsList)
            .setColor('#0099ff');
            message.channel.send(embed);
    }
}

module.exports = help
