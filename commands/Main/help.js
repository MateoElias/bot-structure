const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
	name: "help",
	aliases: ["h", "commands", "cmds"],
	description: "Help Command",
	run: async (client, message, args) => {
		const row = new MessageActionRow().addComponents(
			new MessageButton()
				.setCustomId("primary")
				.setLabel("Yes")
				.setStyle("PRIMARY")
		);

		message.reply({
			content: "Do you need help?",
			components: [row],
			ephemeral: true,
		});

		const filter = (i) =>
			i.customId === "primary" && i.user.id === message.author.id;

		const collector = message.channel.createMessageComponentCollector({
			filter,
			time: 15000,
		});

		collector.on("collect", async (i) => {
			if (i.customId === "primary") {
				await i.update({
					content: "A button was clicked!",
					components: [],
				});
			}
		});

		collector.on("end", (collected) => {
			console.log(collected);
			console.log(`Collected ${collected.size} items`);
		});
	},
};
