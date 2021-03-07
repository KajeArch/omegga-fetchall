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
			const isAuthorized = p => p.isHost() || (p.getRoles().includes('Admin'));
			if (!isAuthorized(player)) return; // you're not an admin, too bad. 

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
