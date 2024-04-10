const Discord = require("discord.js")

const { JsonDatabase, } = require("wio.db");

const config = new JsonDatabase({ databasePath:"./config.json" });

const perms = new JsonDatabase({ databasePath:"./databases/myJsonPerms.json" });

const db = new JsonDatabase({ databasePath:"./databases/myJsonBotConfig.json" });

const dbB = new JsonDatabase({ databasePath:"./databases/myJsonBotConfig.json" });



module.exports = {

    name: "configbot", 

    run: async(client, message, args) => {

      if(message.author.id !== `${perms.get(`${message.author.id}_id`)}`) return message.reply(`❌ | **Você não está na lista de pessoas!**`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));

       

      const chave = args[0];

      const testemxthx2 = new Discord.MessageActionRow()

        .addComponents(

          new Discord.MessageButton()

            .setCustomId('termos')

            .setEmoji('<:ticketlogsa:1072609428219629598>')

            .setLabel('Alterar Mensagem dos Termos')

            .setStyle('PRIMARY'),

        )

        .addComponents(

            new Discord.MessageButton()

              .setCustomId('attermos')

              .setEmoji('<a:carregando:1072582225591283902>')

              .setLabel('Atualizar')

              .setStyle('PRIMARY'),

          );



        const msg = await message.reply({ embeds: [new Discord.MessageEmbed()

          .setTitle(`Bot Store | Configurando os Termos`)

          .setDescription(`

          <:ticketlogsa:1072609428219629598>| **Mensagem Atual dos Termos:**\n\n ${db.get(`canaltermos`)} `)

          .setThumbnail(client.user.displayAvatarURL())

          .setColor(`${db.get(`cor`)}`)], components: [testemxthx2]})

        const interação = msg.createMessageComponentCollector({ componentType: "BUTTON", })

        interação.on("collect", async (interaction) => {

         if (message.author.id != interaction.user.id) {

          return;

         }

                



          if (interaction.customId === "termos") {

              interaction.deferUpdate();

              msg.channel.send("<a:carregando2:1072582203583766568>**|** Envie aqui nesse canal os seus Termos. Ex: 1 - não quebre as regras.").then(msg => {

                const filter = m => m.author.id === interaction.user.id;

                const collector = msg.channel.createMessageCollector({ filter, max: 1 });

                collector.on("collect", message => {

                  message.delete()

                  db.set(`canaltermos`, `${message.content}`)

                  msg.edit("<a:acept:1072582174164914187> **|** Alterado!")

              })

            })

          }

        

          if (interaction.customId === 'attermos') {

            interaction.deferUpdate();

            const embed = new Discord.MessageEmbed()

            .setTitle(`Bot Store | Configurando o BOT`)

            .setDescription(`

            <:ticketlogsa:1072609428219629598>| **Canal dos termos:** <#${db.get(`canaltermos`)}>`)

              .setThumbnail(client.user.displayAvatarURL())

              .setColor(`${db.get(`cor`)}`)

            msg.edit({ embeds: [embed] })

            message.channel.send("<a:acept:1072582174164914187> **|** Atualizado!")

              }

            })

          }

        }