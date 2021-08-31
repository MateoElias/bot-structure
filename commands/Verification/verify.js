const http = require("node-fetch");
const noblox = require("noblox.js");
const { MessageEmbed, GuildMember } = require("discord.js");

module.exports = {
	name: "verify",
	aliases: ["vrf"],
	description: "Prototype Command",
	run: async (client, message, args) => {
		const config = client.config;

		//Data From Rover's API
		var data = await http(
			`https://verify.eryn.io/api/user/${message.author.id}`
		);
		data = await data.json();
		// Message
		const botMessage = new MessageEmbed();

		//Roles
		async function roleManager(groupId, robloxId) {
			const isInGroup =
				(await noblox.getRankInGroup(groupId, robloxId)) != 0;
			if (isInGroup) {
				const rankName = await noblox.getRankNameInGroup(
					groupId,
					robloxId
				);
				const guild = message.guild;

				var role = guild.roles.cache.find(
					(r) => r.name == rankName
				);

				GuildMember.roles.remove(GuildMember.roles.cache);
				try {
					await GuildMember.roles.add(role);
				} catch (err) {
					message.channel.send({
						content: "I am unable to find a role to give.",
					});
				}

				for await (group of config.robloxGroups) {
					if (
						(await noblox.getRankInGroup(
							group.id,
							robloxId
						)) != 0
					) {
						if (group.id && group.name) {
							GuildMember.roles.add(
								guild.roles.cache.find(
									(r) => r.name == group.name
								)
							);
						}
					}
				}
			} else {
				GuildMember.roles.remove(GuildMember.roles.cache);
				GuildMember.roles.add((r) => r.name == "Class D");
			}
		}

		if (data.status == "ok") {
			botMessage.setTitle("Verification Successful");
			botMessage.setDescription(
				`You are currently verified as **${data.robloxUsername}**`
			);
			botMessage.setColor("GREEN");
			botMessage.addField(
				"***Is this not your account?***",
				"Re-Verify your account using the following [link](https://verify.eryn.io/)"
			);
			try {
				await message.member.setNickname(data.robloxUsername);
			} catch (err) {
				await message.channel.send({
					content: "I am unable to change your nickname, please ensure I have the proper permissions",
				});
			} finally {
				message.channel.send({ embeds: [botMessage] });
			}

			roleManager(config.robloxGroups[0].id, data.robloxId);
		} else {
			switch (data.errorCode) {
				case 404:
					botMessage.setTitle("User Not Found");
					botMessage.setColor("RED");
					botMessage.setDescription(
						"Your account is not verified, you can do so by using the following [link](https://verify.eryn.io/)"
					);
					break;

				case 429:
					botMessage.setTitle("Too Many Requests");
					botMessage.setColor("RED");
					botMessage.setDescription(
						`The API is currently receiving too many requests from various clients, please retry after **${data.retryAfterSeconds}** seconds`
					);
					break;

				default:
					botMessage.setTitle(`${data.errorCode} Error`);
					botMessage.setDescription(
						"An error has occured, please try again after a few minutes, if the error persists, contact server administration."
					);
					botMessage.setColor("RED");
			}
			message.channel.send({ embeds: [botMessage] });
		}
	},
};
