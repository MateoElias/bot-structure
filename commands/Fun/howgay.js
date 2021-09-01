const { MessageEmbed } = require("discord.js");
module.exports = {
	name: "howgay",
	category: "Fun",
	aliases: ["hw", "gay", "gaymeter"],
	description: "Shows how gay you are lmao",
	run: (client, message, args) => {
		var name = message.mentions.users.first() || args.join(" ");
		var percent = Math.floor(Math.random() * 100);
		var resp = new MessageEmbed()
			resp.setTitle("Homosexuality Rate")
			resp.setColor("RANDOM");

		if (!name) {
			resp.setDescription(`🏳️‍🌈 You are ${percent}% gay 🏳️‍🌈`);
			message.channel.send({ embeds: [resp] });
		} else {
			resp.setDescription(`🏳️‍🌈 ${name} is ${percent}% gay 🏳️‍🌈`);
			message.channel.send({ embeds: [resp] });
		}
	},
};
