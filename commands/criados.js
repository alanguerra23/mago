const Discord = require("discord.js")
const wio = require("wio.db");
const config = new wio.JsonDatabase({ databasePath:"./config.json" });
const perms = new wio.JsonDatabase({ databasePath:"./databases/myJsonPerms.json" });
const db1 = new wio.JsonDatabase({ databasePath:"./databases/myJsonProdutos.json" });
const db2 = new wio.JsonDatabase({ databasePath:"./databases/myJsonCupons.json" });
const db3 = new wio.JsonDatabase({ databasePath:"./databases/gifts.json" });

module.exports = {
  name: "criados", 
  description: "Veja seus Produtos, Cupons e Gifts criados",
    run: async(client, message, args) => {
      if(message.author.id !== `${perms.get(`${message.author.id}_id`)}`) return message.reply(`Você **não está** na lista de pessoas!`, message)
      const row = new Discord.MessageActionRow()
        .addComponents(
          new Discord.MessageButton()
            .setCustomId('db1')
            .setEmoji('<:info:1072588170153185360>')
            .setLabel('Produtos')
            .setStyle('SECONDARY'),
        )
        .addComponents(
          new Discord.MessageButton()
            .setCustomId('db2')
            .setEmoji('<:info:1072588170153185360>')
            .setLabel('Cupons')
            .setStyle('SECONDARY'),
        )
        .addComponents(
          new Discord.MessageButton()
            .setCustomId('db3')
            .setEmoji('<:info:1072588170153185360>')
            .setLabel('Gifts')
            .setStyle('SECONDARY'),
        )
      
        const embed = new Discord.MessageEmbed()
          .setDescription(`<a:produto:1072582076068544633>| Escolha o tipo de **serviço** que você deseja ver`)
          .setColor(config.get(`color`))
        const msg = await message.reply({ embeds: [embed], components: [row] })
        const filter = i => i.user.id === message.author.id
        const collector = msg.createMessageComponentCollector({ filter })
        collector.on("collect", async interaction => {
          if(interaction.customId.startsWith("db")) {
            interaction.deferUpdate()
            let dbs = interaction.customId
            let itens
            let local
            let status
            
            if(dbs == "db1") {
              if(db1.all().length == 0) return embn(`Não há nenhum **produto criado** no momento!`, msg)
              itens = db1.all()
              local = "Produtos"
              status = "nome"
            }
            if(dbs == "db2") {
              if(db2.all().length == 0) return embn(`Não há nenhum **cupom criado** no momento!`, msg)
              itens = db2.all()
              local = "Cupons"
              status = "desconto"
            }
            if(dbs == "db3") {
              if(db3.all().length == 0) return embn(`Não há nenhum **gift criado** no momento!`, msg)
              itens = db3.all()
              local = "Gifts"
              status = "status"
            }
              
            let texto = ""
            let quant = 1
      
            for(let i in itens) {
              let item = itens[i]
              let value = item.data[status]
              let extra = local == "Cupons" ? "% de desconto" : ""
              texto += `• **${item.ID}** (${value}${extra})\n`
              quant++
            }
        
            const embed = new Discord.MessageEmbed()                       
              .setTitle(`${client.user.username} | ${local} Existentes`)
              .setDescription(texto)
              .setColor(config.get(`color`))
              .setTimestamp()
            msg.edit({ embeds: [embed] })
          }
        })
    }
}