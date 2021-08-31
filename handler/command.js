const { readdirSync } = require("fs");
const chalk = require("chalk");
const { validateModules, checkProperty } = require("../Utils/validate.js");
module.exports = (client) => {
	readdirSync("./commands/").map((dir) => {
		console.log(
			`${chalk.bold.yellow(
				`Now loading commands from: ${chalk.bold.green(
					dir.toUpperCase()
				)}`
			)}`
		);
		const commands = readdirSync(`./commands/${dir}/`).map((cmd) => {
			let pull = require(`../commands/${dir}/${cmd}`);

			try {
				if (validateModules(pull, cmd)) {
					if (checkProperty(pull, cmd)) {
						client.commands.set(
							pull.name.toLowerCase(),
							pull
						);

						console.log(
							`Loaded command: ${chalk.green(
								cmd
							)} ${chalk.blue("|")} ${chalk.italic(
								pull.name
							)}`
						);
						if (pull.aliases && pull.aliases.length !== 0) {
							pull.aliases.forEach((p) => {
								client.aliases.set(p, pull);
							});
						}
					}
				}
			} catch (error) {
				console.log(
					`Unable to load ${chalk.red(cmd)} ${chalk.blue(
						"|"
					)} ${chalk.italic.redBright(`${error.message}`)}`
				);
			}
		});
	});
};
