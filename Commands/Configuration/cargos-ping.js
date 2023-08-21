const Discord = require("discord.js")

module.exports = {
    name: 'cargos-ping',
    description: '[🥪 Owner] DropdownRoles Ping Cargos.',
    type: Discord.ApplicationCommandType.ChatInput,

    run: async (client, interaction, args) => {

 if (!interaction.channel.permissionsFor(interaction.user).has(["0x0000000000000008"])) {
            return interaction.reply({
                content: `**❌ | ${interaction.user}, Você precisa da permissão \`ADMINISTRATOR\` para usar este comando!**`,
                ephemeral: true,
            })
        } else {

        let embed = new Discord.EmbedBuilder()
            .setImage('https://cdn.discordapp.com/attachments/1067440697361313873/1067440853024518144/1672200964185.png')
            .setFooter({ text: interaction.guild.name, iconURL: interaction.guild.iconURL({ dinamyc: true }) })
            .setTimestamp()
            .setColor('Purple')
            .setTitle(`Cargos Avisos`)
            .setDescription('*Selecione no menu dropdown abaixo quais cargos deseja receber.*')

        const dropdown = new Discord.ActionRowBuilder()
            .addComponents(
                new Discord.SelectMenuBuilder()
                    .setCustomId('select2')
                    .setPlaceholder('Clique Aqui!')
                    .addOptions(
                        {
                            label: 'Ping Drop',
                            description: 'Clique aqui para resgatar o cargo avisos drop',
                            emoji: '📦',
                            value: 'java_script',
                        },
                        {
                            label: 'Ping Avisos',
                            description: 'Clique aqui para resgatar o cargo de avisos',
                            emoji: '⚠️',
                            value: 'web',
                        },
                        {
                            label: 'Ping Produtos',
                            description: 'Clique aqui para resgatar o cargo avisos produtos',
                            emoji: '🛒',
                            value: 'dbd',
                        },
                        {
                            label: 'Desbugar',
                            emoji: '💫',
                            value: 'voltar',
                        },
                    ),
            );
        let canal = interaction.guild.channels.cache.get("1067443632744960001");

        canal.send({
            components: [dropdown],
            embeds: [embed],
        })
        await interaction.reply({
            ephemeral: true,
            content: `✅ **| ${interaction.user}, Enviei o dropdownRoles em ${canal} com sucesso!`,
        })
    }
}
}