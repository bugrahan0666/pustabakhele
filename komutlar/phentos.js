const Discord = require("discord.js"),
client = new Discord.Client();

exports.run = async (client, message, args) => {
message.channel.send('PHENTOS & RADE TAŞAĞINI YESİNLER #KİMSECİKLERBAŞ:d')
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 3
};
exports.help = {
  name: 'phentos'
}