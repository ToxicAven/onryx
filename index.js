//token and init P1
const Discord = require('discord.js');
var auth = require('./auth.json');
const bot = new Discord.Client();
const fetch = require('node-fetch');
const querystring = require('querystring');
const trim = (str, max) => (str.length > max ? `${str.slice(0, max - 3)}...` : str);
const date = Date.now()

//Commands Announcement
var uwuify = require('./cmds/uwuify.js');
var version = require('./cmds/version.js');
var ping = require('./cmds/ping.js')
var help = require('./cmds/help.js')
var catgirl = require('./cmds/catgirl.js');
var twobee = require('./cmds/2b2t.js');
var mcskin = require('./cmds/mcskin.js');
var watchdog = require('./cmds/watchdog.js');

//Constants
const botversion = '0.5.12';
const prefix = '^';

//Init P2
bot.on("ready", () => {
    console.log(`\n------------\nOnryx ${botversion}\nRunning as ${bot.user.tag}\nMade by ToxicAven#3678\nLicensed under GNU AGPL-3.0\n------------\n`)
});


//commands handling
bot.on('message', async message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();


    //Version Command
    if (command === 'version') {
        console.log(`Version Command Issued`)
        version.custom(botversion, message);
    }   

    else if (command === 'catgirl') {
        console.log(`Catgirl Command Issued`)
        catgirl.custom(message, Discord, fetch);
    }

    else if (command === 'uwu') {
        console.log(`uwu Command Issued`)
    uwuify.custom(args, message);
    }

    else if (command === 'ping') {
        console.log(`Ping Command Issued`)
        ping.custom(Discord, message, bot);
    }

      else if (command === 'help') {
        console.log(`Help Command Issued`)
        help.custom(Discord, message);
    }
    else if (command === '2b2t') {
        console.log(`2b2t Command Issued`)
        twobee.custom(Discord, message, fetch);
    }

    else if (command === 'mcskin') {
        console.log(`McSkin Command Issued`)
        mcskin.custom(Discord, message, fetch, args);
    }
    /*
    else if (command === 'hypixel') {
        console.log(`Hypixel Command Issued`)
            if (!args.length) {
                return message.channel.send('You need to specify a Player Name!');
        };

        const uuid = await fetch(`https://api.mojang.com/users/profiles/minecraft/${args}`).then(response => response.json());
        const hypixel = await fetch(`https://api.hypixel.net/player?key=${auth.hyapikey}&uuid=${uuid.id}`).then(hypixelresponse => hypixelresponse.json());
        const hypixel2 = hypixel.player.stats
        console.log(hypixel2.networkExp)
        const embed = new Discord.MessageEmbed()
            .setColor('#F531CA')
            .setTitle(hypixel2.networkExp)
        message.channel.send(embed);
    }
*/
    else if (command === 'watchdog') {
        console.log(`Watchdog Command Issued`)
        watchdog.custom(Discord, message, fetch, auth);
}

    //Get MC Username UUID From Mojang API
    else if (command === 'uuid') {
        console.log(`UUID Command Issued`)
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
        console.log(`Hyonline Command Issued`)
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
    bot.user.setActivity("Prefix ^", {type: 'PLAYING'});
});

//Launch
bot.login(auth.token);