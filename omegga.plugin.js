module.exports = class fetchall {
	constructor(omegga, config, store) 
	{
		this.omegga = omegga;
		this.config = config;
		this.store = store;
	}

	async init() {
		Omegga
		.on('cmd:fetchall', async (name, ...args) => {
			const player = Omegga.getPlayer(name);
			const isAuthorized = p => p.isHost() || (p.getRoles() == 'Admin');
			if (!isAuthorized(player)) return; // you're not an admin, too bad. 

			// if only /fetchall is typed in.
			if (args.length == 0)
			{
				try {
					for(const pl of Omegga.players) {
						Omegga.writeln('Chat.Command /tp ' + '"' +  pl.name + '"' + '"' + name + '"' );
					}
				} catch(e) { console.log(e); }
			}

			// if a player is specified in /fetchall, e.g. /fetchall Kaje
			else if(args.length > 0)
			{
				try {
					for(const pl of Omegga.players) {
						Omegga.writeln('Chat.Command /tp ' + '"' +  pl.name + '"' + '"' + args + '"' );
					}
				} catch(e) { console.log(e); }
			}
		})
	return {registeredCommands: ['fetchall']};	
	}

	async stop() { }
}
