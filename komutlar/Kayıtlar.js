const Discord = require('discord.js');
const rdb = require('quick.db')
exports.run = async (client, message, args) => {
  let kayityetkili = '783345825345568788' //Kayıt yetkilisi İD
  if(!message.member.roles.cache.has(kayityetkili)) 
  return message.channel.send(`Bu komutu kullanabilmek için \`Kayıt\` yetkisine sahip olmalısınız.`);
  let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(!member) return message.channel.send('Bir kişiyi etiketlemelisin')
    let kayıtrol = await rdb.fetch(`eskiad_${member.id}`) || 'Eski ismi yok'
    let eskikayıt = await rdb.fetch(`eskikayıt_${member.id}`) || 'Eski ismi yok'
    let toplamik = await rdb.fetch(`toplamik_${member.id}`) || '0'
    let kayıtlılar = new Discord.MessageEmbed()
      .setDescription(`Bu üyenin toplamda \`${toplamik}\` isim kayıtı bulundu!

**Üyenin kayıt olma geçmişi**

${kayıtrol.join('\n')}

**Üyenin isim değiştirme geçmişi**

${eskikayıt.join('\n')}`)
.setColor('f5f5f5')
.setTimestamp()
    message.channel.send(kayıtlılar).then(x => x.delete({timeout: 30000}));
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['kayıtlar','isimler'],
  permLevel: 0
}
exports.help = {
  name: 'isimler',
  description: "kişinin eski isimlerini gösterir",
  usage: 'isimler @kişi'
}