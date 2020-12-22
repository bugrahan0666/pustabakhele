const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const moment = require('moment');
const { Client, Util } = require('discord.js');
const fs = require('fs');
const http = require('http');
const express = require('express');
require('./util/eventLoader.js')(client);
const path = require('path');
const request = require('request');
const queue = new Map();


const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + "Bot Hostlandı!");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

var prefix = ayarlar.prefix;

const log = message => {
    console.log(`${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
    if (err) console.error(err);
    log(`${files.length} komut yüklenecek.`);
    files.forEach(f => {
        let props = require(`./komutlar/${f}`);
        log(`Yüklenen komut: ${props.help.name}.`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};




client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.elevation = message => {
    if (!message.guild) {
        return;
    }
    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    return permlvl;
};

client.on("message", async message => {
    if(!message.author.id == ayarlar.sahip) return;
    if (message.content === "gir") {
        client.emit(
            "guildMemberAdd",
            message.member || (await message.guild.fetchMember(message.author))
        );
    }
});

//Komutlara react sistemi
client.emojiler = {
  onay: "780217796620845096",
  ret: "780217763708534785",
};
//Son

//Sunucuya giriş mesajı
client.on("guildMemberAdd", (member, message) => {
  const sunucuid = "737056938608558101"; //Sunucu 
  const id = "783346525274243152"; //Kanal 
  const kayıtsızRole = "783346366188355624"; //Kayıtsız rol 
  const jailRole = "783345691106738247"
  if (member.guild.id !== sunucuid) return;
  const channel = member.guild.channels.cache.get(id);
let memberGün = moment(member.user.createdAt).format("DD");
let memberTarih = moment(member.user.createdAt).format("YYYY HH:mm:ss");
let guvenilirlik = Date.now()-member.user.createdTimestamp < 1000*60*60*24*7;
let memberAylar = moment(member.user.createdAt).format("MM").replace("01", "Ocak").replace("02", "Şubat").replace("03", "Mart").replace("04", "Nisan").replace("05", "Mayıs").replace("06", "Haziran").replace("07", "Temmuz").replace("08", "Ağustos").replace("09", "Eylül").replace("10", "Ekim").replace("11", "Kasım").replace("12", "Aralık");
let üyesayısı = member.guild.members.cache.size.toString().replace(/ /g, "    ")
var üs = üyesayısı.match(/([0-9])/g)
üyesayısı = üyesayısı.replace(/([a-zA-Z])/g, "bilinmiyor").toLowerCase()
  if(üs) {
  üyesayısı = üyesayısı.replace(/([0-9])/g, d => {
    return {
      '0': `<a:sayi0:783354477348519966>   `,
      '1': `<a:sayi1:783355344125820938> `,
      '2': `<a:sayi2:783355376321822730> `,
      '3': `<a:sayi3:783355391614124073> `,
      '4': `<a:sayi4:783355414971809833> `,                  
      '5': `<a:sayi5:783355424220119060> `,
      '6': `<a:sayi6:783355446328688640> `,
      '7': `<a:sayi7:783355464981151746> `,
      '8': `<a:sayi8:783355487918751772> `,
      '9': `<a:sayi9:783355525101387777>`}[d];
        })
      }
if (guvenilirlik > 1000*60*60*24*7 ) {
    member.roles.add(kayıtsızRole)
  }
if (guvenilirlik < 1000*60*60*24*7 ) {
    member.roles.add(jailRole)
  }

  let rade = new Discord.MessageEmbed()
.setDescription(`
  <a:moon:744307062284222465>  Hoş geldin ${member}, seninle birlikte ${üyesayısı} kişiyiz!

  <a:moon:744307062284222465>  Ses kanalına girerek kayıt olabilirsin sunucuya giriş yaptınız an da <#783346525274243152> okumuş olarak kabul edileceksin ve ona göre hakkın da ceza işlemi yapılacaktır!

  <a:moon:744307062284222465>  Hesabının açılış süresi ${memberGün} ${memberAylar} ${memberTarih} > ${guvenilirlik ? "<a:ret:780217763708534785>" : "<a:onay:780217796620845096> "} 
  `) 
  .setColor('f5f5f5')
  .setTimestamp();
  channel.send(rade);
  
});
//

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});
client.login(ayarlar.token);