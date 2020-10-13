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

/*Commands List
var commandsList = [
    prefix + "version - Displays version of bot",
    prefix + "Help - Displays this message"
]
*/

//commands handling
bot.on('message', async message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    //Urban Dictionary Definition Pull
    if (command === 'urban') {
		if (!args.length) {
			return message.channel.send('You need to supply a search term!');
		}

        //add "Term=`args`" To the API Call
		const query = querystring.stringify({ term: args.join(' ') });

        //Send Request
		const { list } = await fetch(`https://api.urbandictionary.com/v0/define?${query}`).then(response => response.json());

        //No Results Check
		if (!list.length) {
			return message.channel.send(`No results found for **${args.join(' ')}**.`);
		}

        //Put the response into an constant
		const [answer] = list;

        //Generate Embed
		const embed = new Discord.MessageEmbed()
			.setColor('#EFFF00')
			.setTitle(answer.word)
			.addFields(
				{ name: 'Definition', value: trim(answer.definition, 1024) },
				{ name: 'Example', value: trim(answer.example, 1024) },
			);
        message.channel.send(embed);  
    }   

    //Version COmmand
    else if (command === 'version') {
        message.channel.send('Running Bot Version ' + version);
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

    //Create Embed, Include Username and Status
        const embed = new Discord.MessageEmbed()
            .setColor('#F531CA')
            .setTitle(args)
            .addFields(
				{ name: 'Online', value: trim(hypixel.session.online, 1024) },
			);
        message.channel.send(embed);
    };

});

//Status set
bot.on("ready", async() => {
    bot.user.setActivity("you like a fiddle", {type: 'PLAYING'});
});

//Launch
bot.login(auth.token);