const chalk = require("chalk");
module.exports = {
	name: "ready",
	run: async (client) => {
		console.log(
			`${chalk.bold(
				client.user.username
			)} is now online [${chalk.bold.greenBright(
				client.readyAt.toLocaleTimeString()
			)}]\n`
		);
	},
};
