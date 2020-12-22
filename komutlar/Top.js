const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const rdb = require('quick.db')
const pdb = rdb.table('teyitler');
exports.run = async (client, message, args) => {
   let embed = new MessageEmbed().setColor("RANDOM").setTimestamp();
    let teyitData = rdb.get("kayıt") || {};
    let data = Object.keys(teyitData);
    let dataTop = data.filter(x => message.guild.members.cache.has(x)).sort((a, b) => Number((teyitData[b].e_ || 0) + (teyitData[b].k_ || 0)) - Number((teyitData[a].e_) + (teyitData[a].k_))).map((value, index) => `\`${index+1}.\` ${message.guild.members.cache.get(value)} adlı üyenin toplam **${(teyitData[value].e_ || 0) + (teyitData[value].k_ || 0)}** (\`${teyitData[value].e_ || 0}\` erkek, \`${teyitData[value].k_ || 0}\` kadın)`).splice(0, 30).join("\n");
    message.channel.send(embed.setDescription(`**Sıralama** \n\n ${dataTop || 'Sıralama için yeterli veri bulunamadı!'}`));
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['top','topteyit'],
  permLevel: 0
}
exports.help = {
  name: 'top',
  description: "toplam teyit gösterir",
  usage: 'top'
}