const Discord = require("discord.js")
const { JsonDatabase, } = require("wio.db");
const config = new JsonDatabase({ databasePath:"./config.json" });
const perms = new JsonDatabase({ databasePath:"./databases/myJsonPerms.json" });
const db = new JsonDatabase({ databasePath:"./databases/myJsonProdutos.json" });

module.exports = {
    name: "criar", 
    run: async(client, message, args) => {
      if(message.author.id !== `${perms.get(`${message.author.id}_id`)}`) return message.reply(`<a:recusar:1072582282315038802> | Você não está na lista de pessoas!`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));
      if(!args[0]) return message.reply(`<a:recusar:1072582282315038802>| Você não deu nenhum ID a esse produto!`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));
      if(args[1]) return message.reply(`<a:recusar:1072582282315038802> | Você não pode colocar dois IDs de vez!`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));
      if(args[0] === `${db.get(`${args[0]}.idproduto`)}`) return message.reply(`<a:recusar:1072582282315038802> | Esse ID de produto já é existente!`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));

      const row = new Discord.MessageActionRow()               
        .addComponents(
          new Discord.MessageButton()
            .setCustomId(args[0])
            .setLabel('Comprar')
            .setEmoji("<:carrinho:1072588828851843213>")
            .setStyle('SUCCESS'),
      );
       
      const adici = new Discord.MessageEmbed()
        .setTitle(`${config.get(`title`)} | Bot Store`)
        .setThumbnail(client.user.displayAvatarURL())
                .setImage(`${config.get(`banner`)}`)
                .setColor(config.get(`color`))
        .setDescription(`
\`\`\`
Sem descrição ainda...
\`\`\`
**<a:produto:1072582076068544633>| Nome:** __Sem nome ainda...__
**<:dinheiro:1072582093172920411>| Preço:** __10__
**<:dinheiro:1072582093172920411>| Cargo:** __12309123__
**<:dinheiro:1072582093172920411>| Validade:** __11__
**<:estoque:1072582246197903451> | Estoque:** __0__`)
        .setColor(config.get(`color`))
        .setThumbnail(client.user.displayAvatarURL())
      message.channel.send({embeds: [adici], components: [row]})
        
      const idproduto = args[0]
        db.set(`${idproduto}.idproduto`, `${idproduto}`)
        db.set(`${idproduto}.nome`, `Sem nome ainda...`) 
        db.set(`${idproduto}.desc`, `Sem descrição ainda...`) 
        db.set(`${idproduto}.preco`, 10) 
        db.set(`${idproduto}.roleid`, `sem role ainda`)
        db.set(`${idproduto}.expiration`, 0)

        db.push(`${idproduto}.conta`, `${idproduto}`)
        const a = db.get(`${idproduto}.conta`);
        const removed = a.splice(0, 1);
        db.set(`${idproduto}.conta`, a);
       }
     }