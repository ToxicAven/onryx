//token and init P1
const Discord = require('discord.js');
var auth = require('./auth.json');
const bot = new Discord.Client();
const fetch = require('node-fetch');
const querystring = require('querystring');
const trim = (str, max) => (str.length > max ? `${str.slice(0, max - 3)}...` : str);
const date = Date.now()
//Deps


//Constants
const version = '1.2';
const prefix = '^';

//Init P2
bot.on("ready", () => {
    console.log(`Logged in as ${bot.user.tag}!`)
});

//Commands List
var commandsList = [
    prefix + "version - Displays version of bot",
    prefix + "Help - Displays this message",
    prefix + "uuid - Display a Minecraft Usernames UUID",
    prefix + "hyonline - Checks A players Hypixel status, and location if Online"
]


//commands handling
bot.on('message', async message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();


    //Version Command
    if (command === 'version') {
        message.channel.send('Running Bot Version ' + version);
    }   

      else if (command === 'help') {
              const embed = new Discord.MessageEmbed()
            .setTitle("Commands")
            .setDescription(commandsList)
            .setColor('#0099ff');
        message.channel.send(embed);
    }

    //Get MC Username UUID From Mojang API
    else if (command === 'uuid') {
            if (!args.length) {
                return message.channel.send('You need to specify a Player Name!');
        };

        const uuid = await fetch(`https://api.mojang.com/users/profiles/minecraft/${args}`).then(response => response.json());
        const embed = new Discord.MessageEmbed()
			.setColor('#F531CA')
			.setTitle(uuid.id)
        message.channel.send(embed);
    } 
    
    //Check Hypixel Online Status
    else if (command === 'hyonline') {
        if (!args.length) {
            return message.channel.send('You need to specify a Player Name!');
    };

    //Get UUID because Hypixel API cant take Usernames
    const uuid = await fetch(`https://api.mojang.com/users/profiles/minecraft/${args}`).then(response => response.json());

    //Get Online Status
    const hypixel = await fetch(`https://api.hypixel.net/status?key=${auth.hyapikey}&uuid=${uuid.id}`).then(hypixelresponse => hypixelresponse.json());

    //Check for Map and Mode, because hypixel has 2 fucking variables that dont exist all the time
    if (hypixel.session && hypixel.session.mode) {
  var fields =[  { name: 'Online', value: trim(hypixel.session.online, 1024) },
            { name: 'Gametype', value: trim(hypixel.session.gameType, 1024) },
            { name: 'Mode', value: trim(hypixel.session.mode, 1024) }, ]
            }
    if (hypixel.session && hypixel.session.map) {
        var fields =[  { name: 'Online', value: trim(hypixel.session.online, 1024) },
          { name: 'Gametype', value: trim(hypixel.session.gameType, 1024) },
          { name: 'Map', value: trim(hypixel.session.map, 1024) }, ]
          }
    if (hypixel.session && hypixel.session.map && hypixel.session.mode) {
        var fields =[  { name: 'Online', value: trim(hypixel.session.online, 1024) },
          { name: 'Gametype', value: trim(hypixel.session.gameType, 1024) },
          { name: 'Mode', value: trim(hypixel.session.mode, 1024) },
          { name: 'Map', value: trim(hypixel.session.map, 1024) }, ]
          }

    //Create Embed, Include Username and Status
    if (hypixel.session.online === false) {
        const embed = new Discord.MessageEmbed()
        .setColor('#FF0000')
        .setTitle(args)
        .addFields(
            { name: 'Online', value: trim(hypixel.session.online, 1024) },
        );
    message.channel.send(embed);  
    } else if (hypixel.session.online === true) {
        const embed = new Discord.MessageEmbed()
            .setColor('#00FF00')
            .setTitle(args)
            .addFields(fields);
        message.channel.send(embed);
            }
    
    };

});

//Status set
bot.on("ready", async() => {
    bot.user.setActivity("APIs Stutter", {type: 'WATCHING'});
});

//Launch
bot.login(auth.token);