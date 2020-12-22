const Discord = require('discord.js');
const rdb = require('quick.db');
const pdb = rdb.table('teyitler');
const moment = require("moment");
exports.run = async (client, message, args) => {
  let kayıtYetkili = '783345825345568788' //Kayıt yetkilisi İD
  if(!message.member.roles.cache.has(kayıtYetkili))
  return message.channel.send(`Bu komutu kullanabilmek için ayarlanan kayıt yetkisine sahip olmalısınız!`);
   let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
  if(!member) {
    let erkek = await rdb.fetch(`kayıte_${message.author.id}`) || '0'
    let kız = await rdb.fetch(`kayıtk_${message.author.id}`) || '0'
    let toplam = await rdb.fetch(`kayıttoplam_${message.author.id}`) || '0'
    let kayitBilgi = `Toplam **${toplam}** kişi kaydetmiş; **${erkek}** erkek, **${kız}** kadın.`
    let kayıtlılar = new Discord.MessageEmbed()
    .setColor('f5f5f5')
    .setTitle(`Teyit bilgileriniz`)
    .setDescription(`
    __**Kullanıcı Bilgisi;**__
    
    \`Kullanıcı Adı:\` **${member.user.tag}**
    \`ID:\` **${member.id}**
    \`Oluşturulma Tarihi:\` **${moment(member.user.createdAt).format("DD/MM/YY HH:mm:ss")}**
    __**Sunucu İçi Bilgisi;**__
    \`Rolleri:\` ${member.roles.cache.size > 8 ? `Çok fazla rolün mevcut (${member.roles.cache.size})` : member.roles.cache.filter(x => x.name !== "@everyone").map(roles => roles).join(",")}
    \`Takma İsim:\` **${member.displayName.replace("`", "")}**
    \`Katılma Tarihi:\` **${moment(member.joinedAt).format("DD/MM/YY HH:mm:ss")}**
    __**Kayıt Bilgileri;**__
    ${kayitBilgi}
    `)
    .setTimestamp()
    message.channel.send(kayıtlılar)
  }
    if(member) {
    let erkek = await rdb.fetch(`kayıte_${member.id}`) || '0'
    let kız = await rdb.fetch(`kayıtk_${member.id}`) || '0'
    let toplam = await rdb.fetch(`kayıttoplam_${member.id}`) || '0'
    let kayitBilgi = `Toplam **${toplam}** kişi kaydetmiş; **${erkek}** erkek, **${kız}** kadın.`
    let kayıtlılar = new Discord.MessageEmbed()
    .setColor('f5f5f5')
        .setDescription(`
    __**Kullanıcı Bilgisi;**__
    
    \`Kullanıcı Adı:\` **${member.user.tag}**
    \`ID:\` **${member.id}**
    \`Oluşturulma Tarihi:\` **${moment(member.user.createdAt).format("DD/MM/YY HH:mm:ss")}**
    __**Sunucu İçi Bilgisi;**__
    \`Rolleri:\` ${member.roles.cache.size > 8 ? `Çok fazla rolün mevcut (${member.roles.cache.size})` : member.roles.cache.filter(x => x.name !== "@everyone").map(roles => roles).join(",")}
    \`Takma İsim:\` **${member.displayName.replace("`", "")}**
    \`Katılma Tarihi:\` **${moment(member.joinedAt).format("DD/MM/YY HH:mm:ss")}**
    __**Kayıt Bilgileri;**__
    ${kayitBilgi}
    `)
    .setTimestamp()
    message.channel.send(kayıtlılar)
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['ks','teyit','me'],
  permLevel: 0
}
exports.help = {
  name: 'kayıtsay',
  description: "Teyit sayısını gösterir",
  usage: 'kayıtsay <nick>'
}