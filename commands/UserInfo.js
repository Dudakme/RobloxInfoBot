const { SlashCommandBuilder } = require('@discordjs/builders');
const fetch = require('cross-fetch');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('getuser')
		.setDescription('Gets the user data from roblox')
		.addStringOption(option => option.setName('username').setDescription('Enter the username')),
	async execute(client, interaction) {
		const user = interaction.options.getString('username');

		await fetch(`https://api.roblox.com/users/get-by-username?username=${user}`)
			.then(res => {
				if (res.status >= 400) {
					throw new Error("Bad response from server");
				}
				return res.json();
			})
			.then(info => {
				const id = info.Id;

				fetch(`https://users.roblox.com/v1/users/${id}`)
					.then(res => {
						if (res.status >= 400) {
							throw new Error("Bad response from server");
						}
						return res.json();
					})
					.then(user => {

						const Embed = new MessageEmbed()
							.setColor('#ff0000')
							.setTitle(user.name)
							.setURL(`https://web.roblox.com/users/${user.id}/profile`)
							.setDescription(`**description** \n ${user.description}`)
							.setThumbnail('https://upload.wikimedia.org/wikipedia/commons/b/bb/Roblox_logo.png')
							.addFields(
								{ name: 'DisplayName', value: user.displayName },
								{ name: 'Created', value: user.created },

							)
							.setTimestamp()
							.setFooter({ text: 'From roblox API' });

						interaction.reply({ embeds: [Embed] })
					})
					.catch(err => {
						interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true })
					});

			})

			.catch(err => {
				interaction.reply({ content: 'was an error while executing this command!', ephemeral: true })
			})




	},
};