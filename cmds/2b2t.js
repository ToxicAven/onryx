var twobee = {
    custom: async function(Discord, message, fetch) {
        const prio = (await fetch(`https://api.2b2t.dev/prioq`).then(response => response.json()))[1];
        const standard = (await fetch(`https://2b2t.io/api/queue?last=true`).then(standardresponse => standardresponse.json()))[0][1];
        const TPS = (await fetch(`https://api.2b2t.dev/status`).then(tpsresponse => tpsresponse.json()))[0][0];
        const uptime = (await fetch(`https://api.2b2t.dev/status`).then(uptimeresponse => uptimeresponse.json()))[0][3];
        if (uptime === 0) {
            var twoBfield = [
                { name: 'Priority Queue', value: prio},
                { name: 'Standard Queue', value: standard},
                { name: 'TPS', value: 'Bot Offline'},
                { name: 'Uptime', value: 'Bot Offline'},
            ]
        } else {
            var twoBfield = [
                { name: 'Priority Queue', value: prio},
                { name: 'Standard Queue', value: standard},
                { name: 'TPS', value: TPS},
                { name: 'Uptime', value: uptime},
            ] 
        }
        const embed = new Discord.MessageEmbed()
            .setColor('#F531CA')
            .setTitle('2B2T Stats')
            .addFields(twoBfield)
        message.channel.send(embed);
    }
}

module.exports = twobee
