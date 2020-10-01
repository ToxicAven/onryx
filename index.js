//token and init P1
const Discord = require('discord.js');
var auth = require('./auth.json');
const bot = new Discord.Client();

//Deps


//Constants
const version = '1.2';
const PREFIX = '$';

//Init P2
bot.on("ready", () => {
    console.log(`Logged in as ${bot.user.tag}!`)
});

//Commands List
var commandsList = [
    PREFIX + "version - Displays version of bot",
    PREFIX + "Help - Displays this message"
]

//commands handling
bot.on("message", (message) => {
    if (message.author.bot || !message.content.startsWith(PREFIX)) return;

    const args = message.content.slice(PREFIX.length).split(/ +/g);

    switch(args[0]){
        case 'version':
            message.channel.send('Running Bot Version ' + version);
            break;

        case 'help':
            var embed = new Discord.MessageEmbed()
            .setAuthor(`
                Always use the prefix "$" before commands!
            `)
            .setDescription(commandsList)
            .setColor('#0099ff');

            message.channel.send(embed);
            break;
    }
});

//Status set
bot.on("ready", async() => {
    bot.user.setActivity("you like a fiddle", {type: 'PLAYING'});
});

//Launch
bot.login(auth.token);