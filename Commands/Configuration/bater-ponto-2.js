const Discord = require("discord.js")
const moment = require("moment")
const { ApplicationCommandType, ActionRowBuilder, EmbedBuilder, ComponentType } = require('discord.js');


module.exports = {
    name: "bate-ponto-2",
    description: "Bata Seu Ponto",
    type: 1,
    permissions: [],

    run: async (client, interaction, options, message) => {

        var canal = client.channels.cache.get(interaction.channel.id)
        interaction.reply('.').then(msg => interaction.deleteReply())
        let terminar = new ActionRowBuilder().addComponents(
            new Discord.ButtonBuilder()
                .setCustomId("terminar")
                .setLabel('❌ Finalizar')
                .setStyle("Danger")
        )
        let name = interaction.options.getChannel("id")

        let embed = new EmbedBuilder()
            .setAuthor({ name: "Ponto iniciado" })
            .setThumbnail(interaction.user.displayAvatarURL({ format: "png", dinamyc: true, size: 4096 }))
            .setFields(
                { name: "Usuário:", value: `${interaction.user.username}\n> ${interaction.user.id}`, inline: false },
                { name: "**Iniciou:**", value: `<t:${moment(interaction.createdTimestamp).unix()}>`, inline: true },
                { name: "**Finalizou:**", value: 'Bate ponto ainda não finalizado', inline: true },
            )
            .setColor("0x151515")
        const msg = await canal.send({ embeds: [embed], components: [terminar] })

        const collector = msg.createMessageComponentCollector({ componentType: ComponentType.Button })

        collector.on('collect', async (i) => {

            if (i.user.id != interaction.user.id) return collected.reply({ content: `❌ \`|\` **Somente a pessoa que executou o comando (\`${interaction.user.tag}\`) pode interagir com ele.**`, ephemeral: true });

            let dataAtual = new Date(); //variável recebe a data atual
            let hora = dataAtual.toLocaleString('pt-BR', {day: 'numeric', month:'numeric', year: "numeric", hour: 'numeric', minute: "numeric", second: "numeric", hour12: false, timeZone: 'America/Sao_Paulo' });  //variavel pega hora dia mes minuto de sao paulo atual

            if (i.customId === "terminar") {
                const terminou = new EmbedBuilder()
                    .setAuthor({ name: "Ponto encerrado" })
                    .setThumbnail(interaction.user.displayAvatarURL({ format: "png", dinamyc: true, size: 4096 }))
                    .setFields(
                        { name: "Usuário:", value: `${interaction.user.username}\n> ${interaction.user.id}`, inline: false },
                        { name: "**Iniciou:**", value: `<t:${moment(interaction.createdTimestamp).unix()}>`, inline: true },
                        { name: "**Finalizou:**", value: `${hora}`, inline: true },
                    )
                    .setColor("Purple")
                i.update({
                    embeds: [terminou],
                    components: []
                })
                interaction.reply({content: ``})
            }
        })
    }
};