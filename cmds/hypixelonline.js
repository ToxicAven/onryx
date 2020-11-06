var hypixelonline = {
    custom: async function(Discord, message, fetch, auth, args) {
        if (!args.length) {
            return message.channel.send('You need to specify a Player Name!');
    };

    //Get UUID because Hypixel API cant take Usernames
    const uuid = await fetch(`https://api.mojang.com/users/profiles/minecraft/${args}`).then(response => response.json());

    //Get Online Status
    const hypixel = await fetch(`https://api.hypixel.net/status?key=${auth.hyapikey}&uuid=${uuid.id}`).then(hypixelresponse => hypixelresponse.json());

    //Check for Map and Mode, because hypixel has 2 fucking variables that dont exist all the time
    if (hypixel.session && hypixel.session.mode) {
  var fields =[  { name: 'Online', value: hypixel.session.online},
            { name: 'Gametype', value: hypixel.session.gameType},
            { name: 'Mode', value: hypixel.session.mode}]
            }
    if (hypixel.session && hypixel.session.map) {
        var fields =[  { name: 'Online', value: hypixel.session.online},
          { name: 'Gametype', value: hypixel.session.gameType},
          { name: 'Map', value: hypixel.session.map}]
          }
    if (hypixel.session && hypixel.session.map && hypixel.session.mode) {
        var fields =[  { name: 'Online', value: trim(hypixel.session.online, 1024) },
          { name: 'Gametype', value: hypixel.session.gameType},
          { name: 'Mode', value: hypixel.session.mode},
          { name: 'Map', value: hypixel.session.map}]
          }

    //Create Embed, Include Username and Status
    if (hypixel.session.online === false) {
        const embed = new Discord.MessageEmbed()
        .setColor('#FF0000')
        .setTitle(args)
        .addFields(
            { name: 'Online', value: hypixel.session.online},
        );
    message.channel.send(embed);  
    } else if (hypixel.session.online === true) {
        const embed = new Discord.MessageEmbed()
            .setColor('#00FF00')
            .setTitle(args)
            .addFields(fields);
        message.channel.send(embed);
        }
    }
}

module.exports = hypixelonline