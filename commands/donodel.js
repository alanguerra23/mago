const Discord = require("discord.js")
const { JsonDatabase, } = require("wio.db");
const perms = new JsonDatabase({ databasePath:"./databases/myJsonPerms.json" });
const config = new JsonDatabase({ databasePath:"./config.json" });

module.exports = {
    name: "donoadd",
    run: async(client, message, args) => {
      const user = args[0]
      if (message.author.id !==`1010991472398573600`) return message.reply(`<a:recusar:1072582282315038802> | Apenas o criador do bot pode usar isso!`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));
      if (config.get(`owner`) === `1010991472398573600`) return message.reply(`<a:recusar:1072582282315038802> | Não tem nenhum dono setado no momento!`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));
      message.reply(`<a:aceitar:1010991472398573600> | Permissão de dono removida!`)
      config.set(`owner`,`1010991472398573600`)
      if(user !== `${perms.get(`${user}_id`)}`) return
       else {
        perms.delete(`${user}_id`)
       }
    }
  }