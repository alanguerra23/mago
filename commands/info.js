const Discord = require("discord.js")
const { JsonDatabase, } = require("wio.db");
const db3 = new JsonDatabase({ databasePath:"./databases/myJsonIDs.json" });
const config = new JsonDatabase({ databasePath:"./config.json" });

module.exports = {
    name: "info",
    run: async(client, message, args) => {
      const embederro2 = new Discord.MessageEmbed()
      if (!args[0]) return message.reply(`<a:recusar:1065758381467516999> | Você não selecionou nenhum ID de compra!`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));
      if(args[0] !== `${db3.get(`${args[0]}.id`)}`) return message.reply(`<a:recusar:1065758381467516999> | Esse ID de compra não é existente!`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));
        
      const id = args[0]
      const embed = new Discord.MessageEmbed()
        .setTitle(`${config.get(`title`)} | Compra Aprovada`)
        .addField(`<:info:1072588170153185360>| ID Da compra:`, `${db3.get(`${args[0]}.id`)}`)
        .addField(`📡 | Status:`, `${db3.get(`${args[0]}.status`)}`)
        .addField(`<:cliente:1072582111934034070>| Comprador:`, `<@${db3.get(`${args[0]}.userid`)}>`)
        .addField(`<:pessoa:1072592011670077601> | Id Comprador:`, `${db3.get(`${args[0]}.userid`)}`)
        .addField(`📅 | Data da compra:`, `${db3.get(`${args[0]}.dataid`)}`)
        .addField(`<a:produto:1072582076068544633>| Produto:`, `${db3.get(`${args[0]}.nomeid`)}`)
        .addField(`<:estoque:1072582246197903451> | Quantidade:`, `${db3.get(`${args[0]}.qtdid`)}`)
        .addField(`<:dinheiro:1072582093172920411>| Preço:`, `${db3.get(`${args[0]}.precoid`)}`)
        .setColor(config.get(`color`))
      message.reply({embeds: [embed], content: "<a:acept:1072582174164914187> | Encontrado!"})
    }
}