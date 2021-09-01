const { MessageEmbed } = require("discord.js");
const { distance } = require("fastest-levenshtein");

module.exports = {
	name: "messageCreate",
	run: async (client, message) => {
		const { PREFIX } = client.config;

		if (message.author.bot) return;
		if (!message.content.startsWith(PREFIX)) return;
		if (!message.guild) return;
		if (!message.member)
			message.member = await message.guild.fetchMember(message);
		const args = message.content.slice(PREFIX.length).trim().split(/ +/g);
		const cmd = args.shift().toLowerCase();
		if (cmd.length == 0) return;
		if (!isNaN(parseFloat(cmd))) return;
		var command =
			client.commands.get(cmd.toLowerCase()) ||
			client.commands.find((command) =>
				command.aliases?.includes(cmd.toLowerCase().toString())
			);

		if (!command) {
			const all = [
				...client.commands.map((cmd) => cmd.name),
				...client.aliases.keys(),
			];

			const best = all.filter(
				(c) =>
					distance(cmd.toLowerCase(), c.toLowerCase()) <
					c.length * 0.4
			);
			const dym =
				best.length == 0
					? ""
					: best.length == 1
					? `Did you mean **${best[0]}**?`
					: `Did you mean one of these?\n${best
							.slice(0, 3)
							.map((value) => `**${value}**`)
							.join("\n")}`;

			return message.channel.send({
				content: `Coulnd't find that command\n${dym}`,
			});
		}

		try {
			await command.run(client, message, args);
		} catch (err) {
			return message.channel.send({
				content: `**An error has occured**\n\`${err.message}\`\n\`\`\`\n${err.stack}\`\`\``,
				ephemeral: true,
			});
		}
	},
};
