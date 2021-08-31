const { MessageEmbed } = require("discord.js");

module.exports = {
	name: "help",
	aliases: ["h", "commands", "cmds"],
	description: "Help Command",
	run: async (client, message, args) => {
		message.channel.send({ content: "Help command in progress" });
	},
};
