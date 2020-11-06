var uwuify = {
    custom: function(args, message) {

    var str = args.join(' ')

    str = str.replace('L', 'W')
    str = str.replace('R', 'W')
    str = str.replace('l', 'w')
    str = str.replace('r', 'w')
    str = str.replace("no", "nyo")
    str = str.replace("mo", "myo")
    str = str.replace("No", "Nyo")
    str = str.replace("Mo", "Myo")
    str = str.replace("na", "nya")
    str = str.replace("ni", "nyi")
    str = str.replace("nu", "nyu")
    str = str.replace("ne", "nye")
    str = str.replace("anye", "ane")
    str = str.replace("inye", "ine")
    str = str.replace("onye", "one")
    str = str.replace("unye", "une")

        if (str[0].match(/[a-z]/i))
            str = str[0] + "-" + str;

        if (str[str.length - 1].match(/[a-z]/i))
            str = str + "\~\~";

            message.channel.send(message.author.username + ':\n> ' + str)
    }
}
module.exports = uwuify

