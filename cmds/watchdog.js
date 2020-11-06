var watchdog = {
    custom: async function(Discord, message, fetch, hyapikey) {
    const wdStats = await fetch(`https://api.hypixel.net/watchdogstats?key=${hyapikey}`).then(response => response.json());
    const embed = new Discord.MessageEmbed()
        .setColor('#F531CA')
        .setTitle('Watchdog Stats')
        .addFields(
            { name: 'Bans in the last Day', value: wdStats.watchdog_rollingDaily},
            { name: 'Bans in the last Minute', value: wdStats.watchdog_lastMinute},
            { name: 'Watchdog Bans Ever', value: wdStats.watchdog_total},
            )
    message.channel.send(embed);
    }
}

module.exports = watchdog