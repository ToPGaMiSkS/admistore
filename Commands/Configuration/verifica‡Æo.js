const Discord = require("discord.js")
const { QuickDB } = require("quick.db")
const db = new QuickDB()

module.exports = {
    name: "verificação", // Coloque o nome do comando
    description: "Ative o sistema de verificação.", // Coloque a descrição do comando
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: "cargo_verificado",
            description: "Mencione um cargo para o membro receber após se verificar.",
            type: Discord.ApplicationCommandOptionType.Role,
            required: true,
        },
        {
            name: "canal",
            description: "Mencione um canal de texto.",
            type: Discord.ApplicationCommandOptionType.Channel,
            required: false,
        }
    ],

    run: async (client, interaction) => {

        if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageGuild)) {
            interaction.reply(`Olá ${interaction.user}, você não possui permissão para utilizar este comando.`)
        } else {
            let canal = interaction.options.getChannel("canal");
            if (!canal) canal = interaction.channel;

            let cargo = interaction.options.getRole("cargo_verificado");
            await db.set(`cargo_verificação_${interaction.guild.id}`, cargo.id);

            let embed_ephemeral = new Discord.EmbedBuilder()
                .setColor("Green")
                .setDescription(`Olá ${interaction.user}, o sistema foi ativado no canal ${canal} com sucesso.`);

            let embed_verificacao = new Discord.EmbedBuilder()
                .setColor("Purple")
                .setImage('https://media.discordapp.net/attachments/1060589972530397245/1069072532180828200/1674951885103-1.jpg')
                .setDescription(`

        💥 **Para se verificar no nosso servidor, Basta clicar no botão logo abaixo escrito Verifique-se, Apos isso você será verificado automaticamente.**

        ⚠️ **Não fique apertando no botão varias vezes, Caso faça isso estará sujeito a Castigo.**
        
        📩 *Caso de algum erro entre em contato diretamente com a equipe.*`);

            let botao = new Discord.ActionRowBuilder().addComponents(
                new Discord.ButtonBuilder()
                    .setCustomId("verificar")
                    .setEmoji("<:emojicheck:1064010878518841406>")
                    .setLabel("Verifique-se")
                    .setStyle(3)
            );

            interaction.reply({ embeds: [embed_ephemeral], ephemeral: true }).then(() => {
                canal.send({ embeds: [embed_verificacao], components: [botao] })
            })

            client.on("interactionCreate", async (interaction) => {
                if (interaction.isButton()) {

                    let channellogs = client.channels.cache.get("1067440697361313873") // ID do canal de logs
                    const server = interaction.guild.members.cache.get(client.user.id)

                    channellogs.send({
                        embeds: [
                            new Discord.EmbedBuilder()
                                .setDescription(`
                                🎉  **Nova verificação.**
                              
                                ✅ **Usuario verificado:** ${interaction.user}
                
                                ✅**ID do usuario:** ${interaction.user.id}
                                
                                ✅ **Cargo recebido:** ${cargo}
                                
                                *Qualquer erro ou duvidas com o sistema, Entre em contato diretamente com a equipe.*`)
                                .setColor('Purple')
                                .setTimestamp()
                                
                        ],
                    });

                };
            })
        };
    }
}
