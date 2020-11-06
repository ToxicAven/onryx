var version = {
    custom: function(botversion, message) {
        message.channel.send('Running Bot Version ' + botversion);
    }
}

module.exports = version