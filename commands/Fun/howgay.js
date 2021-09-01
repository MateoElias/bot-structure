const { MessageEmbed } = require('discord.js')
module.exports = {
  name: "howgay",
  category: 'Fun',
  aliases: ["hw", "gay", "gaymeter"],
  description: "Shows how gay you are lmao",
  run: (client, message, args) => {
    
    var name = message.mentions.users.first()
    var percent = Math.floor(Math.random() * 100)
    
    if(!name) {
    var resp = new MessageEmbed()
        .setTitle("Homosexuality Rate")
        .setColor('RANDOM')
        .setDescription(`🏳️‍🌈 You are ${percent}% gay 🏳️‍🌈`)
     message.channel.send({embeds: [resp]})
    } else { 
      resp = new MessageEmbed()
        .setTitle("Homosexuality Rate")
        .setColor('RANDOM')
        .setDescription(`🏳️‍🌈 ${name} is ${percent}% gay 🏳️‍🌈`)
      message.channel.send({embeds: [resp]})
    }
  }
}