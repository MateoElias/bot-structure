const {
    MessageEmbed
} = require('discord.js')

module.exports = {
    name: "announce",
    aliases: ["ann"],
    description: "Announcement Command",
    run: async (client, message, args) => {

        const ping = args[0].toLowerCase()

        const chnl = message.guild.channels.cache.find((ch) => ch.name === "statements");

        const sending1 = new MessageEmbed()
        .setTitle("Sending . . .")
        .setColor('ffbb17')

        var sent = new MessageEmbed()
        .setTitle("Success!")
        .setDescription('Your announcement has been published successfully.')
        .setColor('4cb913')
    
        async function Sending(){
            var sending = await message.channel.send(sending1)
            sending.edit(sent)
            setTimeout(async () => {await sending.delete();}, 6000);
            message.delete();
        }

        const announcement = new MessageEmbed()
        

        if(!chnl) return message.channel.send("I was unable to find a channel to send the message.")

        const MSG = message.content.split(" ").slice(2).join(" ")

    }
}