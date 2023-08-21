const Discord = require("discord.js")
const ms = require("ms")

module.exports = {
    name: 'giveaway',
    description: 'Comando de sorteio.',
    options: [
        {
            name: 'canal',
            description: 'Canal que o sorteio será enviado.',
            type: Discord.ApplicationCommandOptionType.Channel,
            required: true
        },
        {
            name: 'descrição',
            description: 'Descrição do sorteio.',
            type: Discord.ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: 'premio',
            description: 'Premio do sorteio.',
            type: Discord.ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: 'tempo',
            description: 'Tempo do sorteio.',
            type: Discord.ApplicationCommandOptionType.String,
            required: true,
            choices: [
                {
                    name: "1 Minuto",
                    value: "1m",
                },
                {
                    name: "10 Minutos",
                    value: "10m",
                },
                {
                    name: "20 Minutos",
                    value: "20m",
                },
                {
                    name: "30 Minutos",
                    value: "30m",
                },
                {
                    name: "40 Minutos",
                    value: "40m",
                },
                {
                    name: "50 Minutos",
                    value: "50m",
                },
                {
                    name: "1 Horas",
                    value: "1h",
                },
                {
                    name: "5 Horas",
                    value: "5h",
                },
                {
                    name: "12 Horas",
                    value: "12h",
                },
                {
                    name: "1 Dia",
                    value: "24h",
                },
                {
                    name: "3 dias",
                    value: "72h",
                },
                {
                    name: "1 Semana",
                    value: "168h",
                }
            ]
        }
    ],

    run: async (client, interaction) => {

        if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageEvents)) {
            return interaction.reply(`Você não tem permissão para usar este comando.`)
        }

        var canal = interaction.options.getChannel('canal')
        var descrição = interaction.options.getString('descrição')
        var premio = interaction.options.getString('premio')
        var tempo = interaction.options.getString('tempo')

        var certo = tempo
            .replace('1m', '1 Minuto')
            .replace('10m', '10 Minutos')
            .replace('20m', '20 Minutos')
            .replace('30m', '30 Minutos')
            .replace('40m', '40 Minutos')
            .replace('50m', '50 Minutos')
            .replace('1h', '1 Hora')
            .replace('5h', '5 Horas')
            .replace('12h', '12 Horas')
            .replace('24h', '1 Dia')
            .replace('72h', '3 Dias')
            .replace('168h', '1 Semana')

        var embed = new Discord.EmbedBuilder()
            .setTitle('🎉 Novo Sorteio 🎉')
            .setColor('Purple')
            .setDescription(`**Reajam no "🎉" para participar do sorteio.**\n\n${descrição}\n\nPatrocinador: ${interaction.user}\nPremio: **${premio}**\nDuração: **${certo}**`)
            .setTimestamp(Date.now() + ms(tempo))
            .setThumbnail(interaction.guild.iconURL({ dynamic: true }))

        canal.send({ embeds: [embed] }).then((message) => {

            message.react('🎉')

            setTimeout(() => {

                var users = message.reactions.cache.get('🎉').users.cache.filter(user => !user.bot)

                if (users.size > 0) {

                    var ganhador = users.random()

                    var embedgg = new Discord.EmbedBuilder()
                        .setTitle('🎉 Novo Sorteio 🎉')
                        .setColor('Purple')
                        .setDescription(`\n${descrição}\n\nReajam no "🎉" para participar do sorteio.\n\nPatrocinador: ${interaction.user}\nPremio: **${premio}**\nDuração: **Finalizado <t:${~~(Date.now() / 1000)}:R>**\nGanhador: ${ganhador}`)
                        .setTimestamp(Date.now())
                        .setFooter({ text: 'Sorteio finalizado' })
                        .setThumbnail(interaction.guild.iconURL({ dynamic: true }))

                    message.edit({ embeds: [embedgg] }).then(() => {

                        message.reply(`Parabéns ${ganhador}, Você ganhou **${premio}**.`)

                    })

                } else {

                    var embedf = new Discord.EmbedBuilder()
                        .setTitle('🎉 Novo Sorteio 🎉')
                        .setColor('Purple')
                        .setDescription(`\n${descrição}\n\nReajam no "🎉" para participar do sorteio.\n\nPatrocinador: ${interaction.user}\nPremio: **${premio}**\nDuração: **Finalizado <t:${~~(Date.now() / 1000)}:R>**\nGanhador: **Niguem**`)
                        .setTimestamp(Date.now())
                        .setFooter({ text: 'Sorteio finalizado' })
                        .setThumbnail(interaction.guild.iconURL({ dynamic: true }))

                    message.edit({ embeds: [embedf] }).then(() => {

                        message.reply(`Sorteio cancelado, pois não houveram participantes.`)

                    })

                }

            }, ms(tempo))

        })

    }

}