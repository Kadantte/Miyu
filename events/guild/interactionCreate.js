const { InteractionType, PermissionsBitField } = require("discord.js");
const { SEARCH_DEFAULT } = require("../../settings/config.js")

module.exports = async(client, interaction) => {
    if (interaction.isCommand || interaction.isContextMenuCommand || interaction.isModalSubmit || interaction.isChatInputCommand) {
        if (!interaction.guild || interaction.user.bot) return;

        let subCommandName = "";
        try {
            subCommandName = interaction.options.getSubcommand();
        } catch { };
        let subCommandGroupName = "";
        try {
            subCommandGroupName = interaction.options.getSubcommandGroup();
        } catch { };

        if (interaction.type == InteractionType.ApplicationCommandAutocomplete) {
            const Random = SEARCH_DEFAULT[Math.floor(Math.random() * SEARCH_DEFAULT.length)];
            
            if(interaction.commandName == "play") {
                const result = await client.manager.search(interaction.options.getString("search") || Random, interaction.user).catch(() => { });
                if (!result) return await interaction.respond([]).catch(() => { });
                let choice = []
                result.tracks.forEach(x => {
                    choice.push({
                        name: x.title.slice(0, 100),
                        value: x.uri
                    });
                });
                return await interaction.respond(choice).catch(() => { });
            } else if (interaction.options.getSubcommand() == "playskip") {
                const result = await client.manager.search(interaction.options.getString("search") || Random, interaction.user).catch(() => { });
                if (!result) return await interaction.respond([]).catch(() => { });
                let choice = []
                result.tracks.forEach(x => {
                    choice.push({
                        name: x.title.slice(0, 100),
                        value: x.uri
                    });
                });
                return await interaction.respond(choice).catch(() => { });
            } else if (interaction.options.getSubcommand() == "playtop") {
                const result = await client.manager.search(interaction.options.getString("search") || Random, interaction.user).catch(() => { });
                if (!result) return await interaction.respond([]).catch(() => { });
                let choice = []
                result.tracks.forEach(x => {
                    choice.push({
                        name: x.title.slice(0, 100),
                        value: x.uri
                    });
                });
                return await interaction.respond(choice).catch(() => { });
            }
        }

        const command = client.commands.find(command => {
            switch (command.name.length) {
            case 1: return command.name[0] == interaction.commandName;
            case 2: return command.name[0] == interaction.commandName && command.name[1] == subCommandName;
            case 3: return command.name[0] == interaction.commandName && command.name[1] == subCommandGroupName && command.name[2] == subCommandName;
            }
        });
        if (!command) return;

        if (command) {
            try {
                command.run(client, interaction);
            } catch (error) {
                console.log(error);
                return interaction.reply({ content: `Something went wrong!`, ephmeral: true });
            }
        }

    }
}
