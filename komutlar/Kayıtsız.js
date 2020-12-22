const Discord = require('discord.js');
const rdb = require('quick.db');
const moment = require('moment');
exports.run = async (client, message, args) => {
let kayıtYetkili = '783345825345568788' 
let kayıtsızRole = '783346366188355624' 
let erkekRole = '788615678751014963'
let kızRole = '788615678361600080'
 if(!message.member.roles.cache.has(kayıtYetkili))
  return message.channel.send(`Bu komutu kullanabilmek için ayarlanan kayıt yetkisine sahip olmalısınız!`).then(x => x.delete({timeout: 5000}));
  let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
if(message.member.roles.highest.position <= member.roles.highest.position) {
    let yüksekte = new Discord.MessageEmbed()
    .setDescription(`Bu kişiye kayıtsız veremiyorum çünkü yetkisi benden üstte.`)
    .setTimestamp()
    .setColor('f5f5f5');
    message.react(client.emojiler.ret).catch();
    return message.channel.send(yüksekte).then(x => x.delete({timeout: 5000}));
  }
  if (!member) return message.channel.send('Bir üye etiketlemelisin.').then(x => x.delete({timeout: 5000}));
  await member.setNickname(`• İsim | Yaş`)
  await member.roles.set([kayıtsızRole])
  let embed = new Discord.MessageEmbed()
  .setColor('f5f5f5')
  .setDescription(`${member} kişisi kayıtsıza atıldı.`)
  .setTimestamp()
message.react(client.emojiler.onay).catch();
message.channel.send(embed).then(x => x.delete({timeout: 15000}));
} 

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['kayıtsız'],
  permLevel: 0
}
exports.help = {
  name: 'kayıtsız',
  description: "Belirtilen üyeye kayıtsız rolü verir",
  usage: 'kayıtsız @kişi isim yaş'
}