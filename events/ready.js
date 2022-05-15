const figlet = require('figlet');
const gradient = require('gradient-string');

module.exports = {
	name: 'ready',
	once: true,
	execute() {
		const msg = 'Discord bot ready!!';
		figlet(msg, (err, data) => {
			if (!err) {
				console.log(gradient.pastel.multiline(data));
			}
		});
	},
};