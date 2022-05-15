const { Collection } = require('discord.js');
const fs = require('fs');

module.exports = {
	name: 'interactionCreate',
	async execute(client, interaction) {

		client.commands = new Collection();
		const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

		for (const file of commandFiles) {
			const command = require(`../commands/${file}`);
			client.commands.set(command.data.name, command);
		}

		if (!interaction.isCommand()) return;
		const command = client.commands.get(interaction.commandName);

		if (!command) return;

		try {
			await command.execute(client, interaction);
		}
		catch (error) {
			console.error(error);
			return interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	},
};