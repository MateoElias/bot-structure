const config = require('./config.json')
const fs = require('fs');

const {Collection, Client, Discord, Intents} = require('discord.js');
const myIntents = new Intents();
myIntents.add(Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_PRESENCES)
const client = new Client({ intents: myIntents})

client.commands = new Collection();
client.events = new Collection();
client.aliases = new Collection();
client.config = config;
client.categories = fs.readdirSync('./commands/');
['command', 'event'].forEach(handler => {
    require(`./handler/${handler}`)(client);
});

client.login(config.TOKEN)