const Discord = require("discord.js")
const { JsonDatabase, } = require("wio.db");
const config = new JsonDatabase({ databasePath:"./config.json" });
const db = new JsonDatabase({ databasePath:"./databases/gifts.json" });

module.exports = {
    name: "estoque", 
    run: async(client, message, args) => {
      
      if(!args[0]) return message.reply(`<a:recusar:1072582282315038802>| Coloque no mínimo um gift!`)
      if(args[1]) return message.reply(`<a:recusar:1072582282315038802> | Você não pode colocar mais de um gift!`)
      if(args[0] !== `${db.get(`${args[0]}.idgift`)}`) return message.reply(`<a:recusar:1072582282315038802>    | Gift inválido!`)
      if(`${db.get(`${args[0]}.status`)}` == `Resgatado`) return message.reply(`<a:recusar:1072582282315038802> | Gift já resgatado!`)
      var texto = ""
      var quant = 1
      var estoque = `${db.get(`${args[0]}.estoque`)}`.split(',');
            
      for(let i in estoque) {
        texto = `${texto}${quant}° | ${estoque[i]}\n`
        quant++
      }
      
      db.set(`${args[0]}.status`, `Resgatado`)
      db.delete(`${args[0]}.estoque`)
      message.reply(`<a:acept:1072582174164914187> | Resgatado com sucesso!`)
      const embed = new Discord.MessageEmbed()
          .setTitle(`${config.get(`title`)} | Gift Resgtado`)
          .addField(`<:estoque:1072582246197903451> Presentes:`, `\`\`\`${texto}\`\`\``)
          .addField(`<:info:1072588170153185360> Código:`, `${args[0]}`)
          .setColor(config.get(`color`))
      message.author.send({embeds: [embed]})
    }
  }      