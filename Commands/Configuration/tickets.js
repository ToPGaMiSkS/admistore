const Discord = require("discord.js")

module.exports = {
  name: "ticketpainel", // Coloque o nome do comando
  description: "Abra o painel de tickets.", // Coloque a descrição do comando
  type: Discord.ApplicationCommandType.ChatInput,

  run: async (client, interaction) => {

    if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageGuild)) {
        interaction.reply({ content: `Você não possui permissão para utilzar este comando!`, ephemeral: true })
    } else {
        let embed = new Discord.EmbedBuilder()
        .setColor("Purple")
        .setImage("https://media.discordapp.net/attachments/1060589972530397245/1069079046845120552/standard_3.gif")
        .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
        .setDescription(`**<:funcionrio:1064596510416834640> Olá, tudo bem? Está precisando de ajuda?
<:vsl_ticket:1064597317828759622> Abra já um ticket!
<:ev_atendimento:1065355626512924722> A Equipe Staff está online de 12:00 até 2:00 da manhã, todos os dias! Lembre-se que poderemos responder fora do prazo!

<a:engrenagem:1065355853479280720> Obrigado pela preferência! Aguardamos vocês como cliente Gold!**.`);
        
        let painel = new Discord.ActionRowBuilder().addComponents(
            new Discord.SelectMenuBuilder()
            .setCustomId("painel_ticket")
            .setPlaceholder("Clique aqui!")
            .addOptions(
                {
                    label: "Suporte ⚙️",
                    description: "Abra um ticket para Suporte.",
                    value: "opc1"
                },
                {
                    label: "Duvida ❓",
                    description: "Abra um ticket para tirar uma Duvida.",
                    value: "opc2"
                },
                {
                    label: "Problemas no Produto 🛒",
                    description: "Abra um ticket para Problema em um Produto.",
                    value: "opc3"
                }
            )
        );

        interaction.reply({ content: `✅ Mensagem enviada!`, ephemeral: true })
        interaction.channel.send({ embeds: [embed], components: [painel] })
    }


  }
}