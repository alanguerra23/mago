const Discord = require("discord.js")
const { JsonDatabase, } = require("wio.db");
const db3 = new JsonDatabase({ databasePath:"./databases/myJsonIDs.json" });
const config = new JsonDatabase({ databasePath:"./config.json" });
const perms = new JsonDatabase({ databasePath:"./databases/myJsonPerms.json" });

module.exports = {
    name: "pagar", 
    run: async(client, message, args) => {
      if(message.author.id !== `${perms.get(`${message.author.id}_id`)}`) return message.reply(`<a:recusar:1072582282315038802> | Você não está na lista de pessoas!`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));
      if(args[0] !== `${db3.get(`${args[0]}.id`)}`) return message.reply(`<a:recusar:1072582282315038802>| Esse ID de compra não existe!`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));
      if(`${db3.get(`${args[0]}.status`)}` === `Concluido`) return message.reply(`<a:recusar:1072582282315038802>| Esse ID de compra já foi marcado como pago!`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));
      if(`${db3.get(`${args[0]}.status`)}` !== `Pendente (2)`) return message.reply(`<a:recusar:1072582282315038802> | Esse ID de compra não pode ser marcado como pago no momento, aguarde até a segunda etapa de pendência!`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));
    
      const id = args[0]
      db3.set(`${id}.status`, `Processando`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));
      message.reply("<a:acept:1072582174164914187> | Status de compra alterado para pago!").then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));
    }
}