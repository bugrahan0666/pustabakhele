const Discord = require('discord.js');
const rdb = require('quick.db');
const pdb = rdb.table('teyitler');
const moment = require('moment');
const ayar = require('../ayarlar.json');
//Başlangıç
exports.run = async (client, message, args) => {
const data = {
  Settings: {
    Yetkiler: ["783345825345568788"],
    ErkekRolleri: ["788615678751014963"],
    KizRolleri: ["788615678361600080"],
    KayitsizRolleri: ["783346366188355624"]
  },
  
}
let kayıtYetkili = '783345825345568788' //Yetkili
let erkekRole = '788615678751014963' //Verilecek
let kizRole = '788615678361600080'
let kayıtsızRole = '783346366188355624' //Alınacak
let tag = '•' //İsmin önüne gelecek simge,tag   
//Rademoon
if(!message.member.roles.cache.has('783345825345568788'))
  return message.channel.send(`Bu komutu kullanabilmek için ayarlanan kayıt yetkisine sahip olmalısınız!`).then(x => x.delete({timeout: 5000}));

  let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
if(message.member.roles.highest.position <= member.roles.highest.position) {
    let yüksekte = new Discord.MessageEmbed()
    .setDescription(`Bu kişiyi kayıt edemiyorum çünkü yetkisi benden üstte.`)
    .setTimestamp()
    .setColor('f5f5f5');
    message.react(client.emojiler.ret).catch();
    return message.channel.send(yüksekte).then(x => x.delete({timeout: 5000}));
  }
  let isim = args[1]
  let yaş = args[2]
  if (!member) return message.channel.send('Bir üye etiketlemelisin.').then(x => x.delete({timeout: 5000}));
  if (!isim) return message.channel.send('Bir isim yazmalısın.').then(x => x.delete({timeout: 5000}));
  if (!yaş) return message.channel.send('Bir yaş yazmalısın.').then(x => x.delete({timeout: 5000}));
  if (isNaN(yaş)) return message.channel.send('Yaş sadece sayı olarak kabul edilir.').then(x => x.delete({timeout: 5000}));
let gün = moment(message.createdAt).format("DD.");
let yıl = moment(message.createdAt).format("YYYY HH:mm:ss");
let ay = moment(message.createdAt).format("MM.")
.replace("Ocak").replace("Şubat")
.replace("Mart").replace("Nisan")
.replace("Mayıs").replace("Haziran")
.replace("Temmuz").replace("Ağustos")
.replace("Eylül").replace("Ekim")
.replace("Kasım").replace("Aralık");
   let kayıtlımı = await rdb.fetch(`kayıtlıkişi_${member}`)
  let eskiismi = await rdb.fetch(`kayıtlıisim_${member}`)
  let toplamaisim = `${gün}${ay}${yıl} tarihin de <@${message.author.id}> tarafından \`${tag} ${isim} | ${yaş}\` **(<@&${erkekRole}>)** olarak kayıtlı.`

   if(member.roles.cache.has(erkekRole) || member.roles.cache.has(kizRole)) {
      message.delete({timeout: 5000})
      return message.channel.send(new Discord.MessageEmbed().setDescription(`<a:ret:780217763708534785> <@${message.author.id}> üzgünüm bu kullanıcıyı tekrar kayıt ettim fakat sana herhangi bir teyit puanı ekleyemedim çünkü veritabanın da kayıtlar buldum.

${eskiismi}

\`.isimler ${member.id}\` komutuyla üyenin geçmiş isimlerine bakmanız tavsiye edilir.`)).then(msg => msg.delete({timeout: 5000}))
     message.react(client.emojiler.ret)
    }
  
  /*if(kayıtlımı !== 'evet') {
  rdb.add(`kayıttoplam_${message.author.id}` , 1) 
  rdb.set(`kayıtlıkişi_${member}`, 'evet')
  rdb.set(`kayıtlıisim_${member}`, toplamaisim)
  rdb.push(`eskiad_${member.id}`, toplamaisim)
  rdb.add(`toplamik_${member.id}`, 1)
  } 
  if(kayıtlımı === 'evet') {
  rdb.set(`kayıtlıisim_${member}`, toplamaisim)
  rdb.push(`eskiad_${member.id}`, toplamaisim)
  rdb.add(`toplamik_${member.id}`, 1)
    let embed = new Discord.MessageEmbed()
  .setDescription(`<a:ret:780217763708534785> <@${message.author.id}> üzgünüm bu kullanıcıyı tekrar kayıt ettim fakat sana herhangi bir teyit puanı ekleyemedim çünkü veritabanın da kayıtlar buldum.

${eskiismi}

\`.isimler ${member.id}\` komutuyla üyenin geçmiş isimlerine bakmanız tavsiye edilir.`)
  .setTimestamp()
  .setColor('f5f5f5')
message.react(client.emojiler.ret).catch();
message.channel.send(embed).then(x => x.delete({timeout: 25000}));
  }*/
  else {
  
  member.setNickname(`${tag} ${isim} | ${yaş}`)
      let mesaj = await message.channel.send(new Discord.MessageEmbed()
        .setDescription("*Aşağıdan etiketlediğin kişinin cinsiyetini seç.*")
        .setFooter(`${ayar.prefix}isimler ile isimleri gör!`)
        .setColor("RANDOM")
        .addField("Kız", "👩", true)
        .addField("Erkek", "🧑", true)
      ).then(async m => {
        await m.react("👩")
        await m.react("🧑")
        return m;
      }).catch(err => undefined);
      let react = await mesaj.awaitReactions((reaction, user) => user.id == message.author.id && Emojiler.some(emoji => emoji == reaction.emoji.name), { errors: ["time"], max: 1, time: 15000 }).then(coll => coll.first()).catch(err => { mesaj.delete().catch(); return; });
      if(!react) return;
      let seçim = "";
      if (react.emoji.name == "👩")
        seçim = "KizRolleri";
      else if (react.emoji.name == "🧑")
        seçim = "ErkekRolleri";
      else {
        return;
      }
      mesaj = await mesaj.reactions.removeAll();
     
     
	 
      data.Settings[seçim].forEach(async rol => {
        await member.roles.set([rol]);
        
        if(seçim === "ErkekRolleri"){
          member.roles.add("788615678751014963")
          member.roles.add
           rdb.add(`kayıte_${message.author.id}`, 1)
        }else{
          member.roles.add("788615678361600080")
          member.roles.remove("783346366188355624")
           rdb.add(`kayıtk_${message.author.id}`, 1)
        }
      })
  
  
   await mesaj.edit(new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setDescription("Kayıt Tamamlandı!")
        .setFooter(`${ayar.prefix}isimler komutu ile isim geçmişini gör!`)
        .addField("İşlem ;", member.toString() + " adlı kişiyi " + message.author.toString() + " adlı yetkili kayıt etti!")
      );
  let genelembed = new Discord.MessageEmbed()  
  .setDescription(`${member} aramıza katıldı. Sunucumuz şuanda **${message.guild.memberCount}** kişi! KURALLARI OKUMAYI UNUTMA!`)
  .setColor('RANDOM')
  message.guild.channels.cache.get('783346545113694248').send(genelembed).then(x => x.delete({timeout: 10000}));


let toplam = await rdb.fetch(`kayıttoplam_${message.author.id}`) || '0'

  
};


}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['erkek'],
  permLevel: 0
}
exports.help = {
  name: 'e',
  description: "erkek kullanıcıları kayıt etme komutu.",
  usage: 'erkek @kişi isim yaş'
}


const Emojiler = [
  "👩",
  "🧑",
  "3️⃣",
  "4️⃣",
  "5️⃣",
  "6️⃣",
  "7️⃣",
  "8️⃣",
  "9️⃣"
]