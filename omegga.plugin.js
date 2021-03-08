// Look through roles and check whether the player has one of them.
function isAuthorized(player, rolelist) {
		for(var roles of rolelist) {
			if(player.getRoles().some(r => r === roles))
				return true;
		}
		return false;
	}

module.exports = class fetchall {
	constructor(omegga, config, store) 
	{
		this.omegga = omegga;
		this.config = config;
		this.store = store;
	}

	init() {
		Omegga
		.on('cmd:fetchall', async (name, ...args) => {
			const player = Omegga.getPlayer(name);
			// get roles from config. Deletes commas, gets rid of whitespace.
			var setRoles = this.config["Roles"].split(',').map(role => role.trim());
			
			if (!(player.isHost()) && !isAuthorized(player, setRoles)) {
				Omegga.whisper(name, "You don't have the permission to use this command"); // too bad
				return;
			}

			// if only /fetchall is typed in.
			if (args.length == 0)
			{
				for(const pl of Omegga.players) {
					Omegga.writeln('Chat.Command /tp ' + '"' +  pl.name + '"' + '"' + name + '"' );
				}
			}

			// if a player is specified in /fetchall, e.g. /fetchall Kaje
			else if(args.length > 0)
			{
				for(const pl of Omegga.players) {
					Omegga.writeln('Chat.Command /tp ' + '"' +  pl.name + '"' + '"' + args + '"' );
				}
			}
		})
	return {registeredCommands: ['fetchall']};	
	}

	stop() { }
}
