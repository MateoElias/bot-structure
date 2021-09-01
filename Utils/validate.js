module.exports.validateModules = (command, commandName) => {
	if (!command.hasOwnProperty("name"))
		throw new Error(`${commandName} does not have a name`);

	if (!command.hasOwnProperty("aliases"))
		throw new Error(`${commandName} does not have aliases`);

	if (!command.hasOwnProperty("description"))
		throw new Error(`${commandName} does not have a description`);

	if (!command.hasOwnProperty("category"))
		throw new Error(`${commandName} does not have a category`);

	if (!command.hasOwnProperty("run"))
		throw new Error(`${commandName} does not have a run function`);

	return true;
};

module.exports.checkProperty = (command, commandName) => {
	if (typeof command.name !== "string")
		throw new Error(`${command.name} is not a string`);

	if (typeof command.category !== "string")
		throw new Error(`${command.name} is not a string`);

	if (typeof command.description !== "string")
		throw new Error(`${command.description} is not a string`);

	if (!Array.isArray(command.aliases))
		throw new Error(`${commandName} aliases are not an array`);

	if (typeof command.run !== "function")
		throw new Error(`${command.run} is not a function`);

	return true;
};
