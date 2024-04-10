const Discord = require("discord.js")
const { JsonDatabase, } = require("wio.db");
const config = new JsonDatabase({ databasePath:"./config.json" });

module.exports = {
    name: "ajuda",
    run: async(client, message, args) => {        
      const row = new Discord.MessageActionRow()
        .addComponents(
          new Discord.MessageButton()
            .setCustomId('retornar')
            .setEmoji('◀')
            .setDisabled(true)
            .setStyle('PRIMARY'),
        )
        .addComponents(
          new Discord.MessageButton()
            .setCustomId('proxima')
            .setEmoji('▶')
            .setDisabled(false)
            .setStyle('PRIMARY'),
        );
        
        const embed = await message.reply({ embeds: [new Discord.MessageEmbed()
          .setTitle(`${config.get(`title`)} | Meus Comandos`)
          .setColor(config.get(`color`))
          .setImage(`${config.get(`banner`)}`)
          .setDescription(`
<:config:1072582261892972634> | ${config.get(`prefix`)}ajuda - Veja meus comandos
<:config:1072582261892972634> | ${config.get(`prefix`)}anuncio - Envie um anuncio Embed
<:config:1072582261892972634> | ${config.get(`prefix`)}botinfo - Veja minhas info
<:config:1072582261892972634> | ${config.get(`prefix`)}info - Veja info de uma compra
<:config:1072582261892972634> | ${config.get(`prefix`)}perfil - Veja seu perfil
<:config:1072582261892972634> | ${config.get(`prefix`)}status - Veja os status de vendas
<:config:1072582261892972634> | ${config.get(`prefix`)}rendimentos - Veja seus rendimentos
<:config:1072582261892972634> | ${config.get(`prefix`)}pegar - Veja um produto entregue
<:config:1072582261892972634> | ${config.get(`prefix`)}pagar - Sete um id para pago
<:config:1072582261892972634> | ${config.get(`prefix`)}criarcupom - Crie um cupom
<:config:1072582261892972634> | ${config.get(`prefix`)}configcupom - Gerencie um cupom
<:config:1072582261892972634> | ${config.get(`prefix`)}limpar - Apague as mensagens do chat
<:config:1072582261892972634> | ${config.get(`prefix`)}limpardm - Apague as mensagens do bot na sua DM
`)
          .setTimestamp()
          .setFooter(`Pagina 1/2`)
          .setThumbnail(client.user.displayAvatarURL())
          .setImage(`${config.get(`banner`)}`)
          .setColor(config.get(`color`))], components: [row]})

      
        const interação = embed.createMessageComponentCollector({ componentType: "BUTTON", })
         interação.on("collect", async (interaction) => {
          if (message.author.id != interaction.user.id) { return; }
            if (interaction.customId === 'retornar') {
              interaction.deferUpdate();
              row.components[0].setDisabled(true)
              row.components[1].setDisabled(false)
              const embednew = new Discord.MessageEmbed()
                .setTitle(`${config.get(`title`)} | Meus Comandos`)
                .setImage(`${config.get(`banner`)}`)
                .setColor(config.get(`color`))
                .setDescription(`
<:config:1072582261892972634>| ${config.get(`prefix`)}ajuda - Veja meus comandos
<:config:1072582261892972634>| ${config.get(`prefix`)}anuncio - Envie um anuncio Embed
<:config:1072582261892972634>| ${config.get(`prefix`)}botinfo - Veja minhas info
<:config:1072582261892972634>| ${config.get(`prefix`)}info - Veja info de uma compra
<:config:1072582261892972634>| ${config.get(`prefix`)}perfil - Veja seu perfil
<:config:1072582261892972634>| ${config.get(`prefix`)}status - Veja os status de vendas
<:config:1072582261892972634>| ${config.get(`prefix`)}rendimentos - Veja seus rendimentos
<:config:1072582261892972634>| ${config.get(`prefix`)}pegar - Veja um produto entregue
<:config:1072582261892972634>| ${config.get(`prefix`)}pagar - Altere um id para pago
<:config:1072582261892972634>| ${config.get(`prefix`)}criarcupom - Crie um cupom
<:config:1072582261892972634>| ${config.get(`prefix`)}configcupom - Gerencie um cupom
<:config:1072582261892972634>| ${config.get(`prefix`)}clear - Apague as mensagens do chat
<:config:1072582261892972634>| ${config.get(`prefix`)}criados - Veja todos os produtos/cupons/gifts criados
`)
                .setTimestamp()
                .setFooter(`Pagina 1/2`)
                .setThumbnail(client.user.displayAvatarURL())
                .setColor(config.get(`color`))
                .setImage(`${config.get(`banner`)}`)
              embed.edit({ embeds: [embednew], components: [row] })
            }
             
            if (interaction.customId === 'proxima') {
              interaction.deferUpdate();
              row.components[0].setDisabled(false)
              row.components[1].setDisabled(true)
              const embednew = new Discord.MessageEmbed()
                .setTitle(`${config.get(`title`)} | Meus Comandos`)
                .setImage(`${config.get(`banner`)}`)
                .setDescription(`
<:config:1072582261892972634> | ${config.get(`prefix`)}criar - Crie um anuncio
<:config:1072582261892972634> | ${config.get(`prefix`)}setar - Sete um anuncio
<:config:1072582261892972634> | ${config.get(`prefix`)}config - Gerencie um anuncio
<:config:1072582261892972634> | ${config.get(`prefix`)}estoque - Gerencie um estoque
<:config:1072582261892972634> | ${config.get(`prefix`)}rank - Veja o Ranking de Clientes
<:config:1072582261892972634> | ${config.get(`prefix`)}configbot - Configura o bot
<:config:1072582261892972634> | ${config.get(`prefix`)}configcanais - Configura os canais
<:config:1072582261892972634> | ${config.get(`prefix`)}configstatus - Configura os status
<:config:1072582261892972634> | ${config.get(`prefix`)}permadd - Adicione um administrador
<:config:1072582261892972634> | ${config.get(`prefix`)}donoadd - Adicione um dono
<:config:1072582261892972634> | ${config.get(`prefix`)}permdel - Remova um administrador
<:config:1072582261892972634> | ${config.get(`prefix`)}donodel - Remova um dono
`)
                .setTimestamp()
                .setFooter(`Pagina 2/2`)
                .setThumbnail(client.user.displayAvatarURL())
                .setColor(config.get(`color`))
                .setImage(`${config.get(`banner`)}`)
              embed.edit({ embeds: [embednew], components: [row] })
              }
            })
          }
        }