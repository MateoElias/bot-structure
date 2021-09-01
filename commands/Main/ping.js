const Discord = require("discord.js");
const ms = require("ms");

module.exports = {
	name: 'ping',
	category: "Main",
	aliases: ["ping"],
	description: "Returns ping",
	run: async (client, message, args) => {

		const ping = new Discord.MessageEmbed()
		.setColor('WHITE')
		.setDescription(`My ping is **${Math.round(client.ws.ping)}**ms`)
		.setFooter(`Uptime: ${ms(client.uptime, { long: true })}`,)

		message.reply({
			embeds: [ping],
		});
	},
};
