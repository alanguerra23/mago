const Discord = require("discord.js")
const { JsonDatabase, } = require("wio.db");
const config = new JsonDatabase({ databasePath:"./config.json" });
const perms = new JsonDatabase({ databasePath:"./databases/myJsonPerms.json" });
const db = new JsonDatabase({ databasePath:"./databases/myJsonProdutos.json" });

module.exports = {
    name: "setar", 
    run: async(client, message, args) => {
      if(message.author.id !== `${perms.get(`${message.author.id}_id`)}`) return message.reply(`<a:recusar:1072582282315038802>| Você não está na lista de pessoas!`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));
      if (!args[0]) return message.reply(`<a:recusar:1072582282315038802> | Você não selecionou nenhum ID de produto!`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));
      if(args[1]) return message.reply(`<a:recusar:1072582282315038802> | Você não selecionar dois IDs de vez!`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));
      if(args[0] !== `${db.get(`${args[0]}.idproduto`)}`) return message.reply(`<a:recusar:1072582282315038802>| Esse ID de produto não é existente!`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));

      const row = new Discord.MessageActionRow()               
        .addComponents(
          new Discord.MessageButton()
            .setCustomId(args[0])
            .setLabel('Comprar')
            .setEmoji("<:carrinho:1072588828851843213>")
            .setStyle('SUCCESS'),
      );
        
      const embed = new Discord.MessageEmbed()
        .setTitle(`${config.get(`title`)} | Bot Store`)
        .setColor(config.get(`color`))
        .setImage(`${config.get(`banner`)}`)
        .setDescription(`
\`\`\`
${db.get(`${args[0]}.desc`)}
\`\`\`
**<a:produto:1072582076068544633>| Nome:** __${db.get(`${args[0]}.nome`)}__
**<:dinheiro:1072582093172920411>| Preço:** __${db.get(`${args[0]}.preco`)}__
**<:dinheiro:1072582093172920411>| Cargo:** __${db.get(`${args[0]}.roleid`)}__
**<:estoque:1072582246197903451> | Estoque:** __${db.get(`${args[0]}.conta`).length}__`)
        .setColor(config.get(`color`))
        .setThumbnail(client.user.displayAvatarURL())
      if(db.get(`${args[0]}.banner`)){
        embed.setImage(db.get(`${args[0]}.banner`))
      }
      message.channel.send({embeds: [embed], components: [row]})
    }
}