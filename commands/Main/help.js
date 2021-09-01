const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
	name: "help",
	aliases: ["h", "commands", "cmds"],
	description: "Help Command",
	run: async (client, message, args) => {
		
		const embed = new MessageEmbed();
		const prefix = client.config.PREFIX;
		const commands = Array.from(client.commands.values());

		for (command of commands) {
			embed.addField(
				`**${prefix}${command.name}**`,
				`__${
					command.description
				}__ \n**Aliases:** \`${command.aliases.join(", ")}\``, false
			);
		}

		message.reply({embeds: [embed]})
	},
};
