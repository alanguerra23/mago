const Discord = require("discord.js")
const moment = require("moment")
const { JsonDatabase, } = require("wio.db");
const db2 = new JsonDatabase({ databasePath:"./databases/myJsonDatabase.json" });
const config = new JsonDatabase({ databasePath:"./config.json" });
const perms = new JsonDatabase({ databasePath:"./databases/myJsonPerms.json" });

moment.locale("pt-br");
module.exports = {
    name: "rendimentos", 
    run: async(client, message, args) => {
      if(message.author.id !== `${perms.get(`${message.author.id}_id`)}`) return message.reply(`<a:recusar:1072582282315038802> | Você não está na lista de pessoas!`)
      const hojepedidos = db2.get(`${moment().format('L')}.pedidos`)  || 0;
      const hojerecebimentos = db2.get(`${moment().format('L')}.recebimentos`) || 0;
       
      var setedias = 0;
       setedias = Number(setedias) + Number(hojepedidos);
       setedias = Number(setedias) + Number(db2.get(`${moment().subtract(1, 'days').format('L')}.pedidos`) || 0);
       setedias = Number(setedias) + Number(db2.get(`${moment().subtract(2, 'days').format('L')}.pedidos`) || 0);
       setedias = Number(setedias) + Number(db2.get(`${moment().subtract(3, 'days').format('L')}.pedidos`) || 0);
       setedias = Number(setedias) + Number(db2.get(`${moment().subtract(4, 'days').format('L')}.pedidos`) || 0);
       setedias = Number(setedias) + Number(db2.get(`${moment().subtract(5, 'days').format('L')}.pedidos`) || 0);
       setedias = Number(setedias) + Number(db2.get(`${moment().subtract(6, 'days').format('L')}.pedidos`) || 0);
       setedias = Number(setedias) + Number(db2.get(`${moment().subtract(7, 'days').format('L')}.pedidos`) || 0);

      var setediasrec = 0;
       setediasrec = Number(setediasrec) + Number(hojerecebimentos);
       setediasrec = Number(setediasrec) + Number(db2.get(`${moment().subtract(1, 'days').format('L')}.recebimentos`) || 0);
       setediasrec = Number(setediasrec) + Number(db2.get(`${moment().subtract(2, 'days').format('L')}.recebimentos`) || 0);
       setediasrec = Number(setediasrec) + Number(db2.get(`${moment().subtract(3, 'days').format('L')}.recebimentos`) || 0);
       setediasrec = Number(setediasrec) + Number(db2.get(`${moment().subtract(4, 'days').format('L')}.recebimentos`) || 0);
       setediasrec = Number(setediasrec) + Number(db2.get(`${moment().subtract(5, 'days').format('L')}.recebimentos`) || 0);
       setediasrec = Number(setediasrec) + Number(db2.get(`${moment().subtract(6, 'days').format('L')}.recebimentos`) || 0);
       setediasrec = Number(setediasrec) + Number(db2.get(`${moment().subtract(7, 'days').format('L')}.recebimentos`) || 0);

      var setedias2 = 0;
       setedias2 = Number(setedias2) + Number(hojepedidos);
       setedias2 = Number(setedias2) + Number(db2.get(`${moment().subtract(1, 'days').format('L')}.pedidos`) || 0);
       setedias2 = Number(setedias2) + Number(db2.get(`${moment().subtract(2, 'days').format('L')}.pedidos`) || 0);
       setedias2 = Number(setedias2) + Number(db2.get(`${moment().subtract(3, 'days').format('L')}.pedidos`) || 0);
       setedias2 = Number(setedias2) + Number(db2.get(`${moment().subtract(4, 'days').format('L')}.pedidos`) || 0);
       setedias2 = Number(setedias2) + Number(db2.get(`${moment().subtract(5, 'days').format('L')}.pedidos`) || 0);
       setedias2 = Number(setedias2) + Number(db2.get(`${moment().subtract(6, 'days').format('L')}.pedidos`) || 0);
       setedias2 = Number(setedias2) + Number(db2.get(`${moment().subtract(7, 'days').format('L')}.pedidos`) || 0);
       setedias2 = Number(setedias2) + Number(db2.get(`${moment().subtract(8, 'days').format('L')}.pedidos`) || 0);
       setedias2 = Number(setedias2) + Number(db2.get(`${moment().subtract(9, 'days').format('L')}.pedidos`) || 0);
       setedias2 = Number(setedias2) + Number(db2.get(`${moment().subtract(10, 'days').format('L')}.pedidos`) || 0);
       setedias2 = Number(setedias2) + Number(db2.get(`${moment().subtract(11, 'days').format('L')}.pedidos`) || 0);
       setedias2 = Number(setedias2) + Number(db2.get(`${moment().subtract(12, 'days').format('L')}.pedidos`) || 0);
       setedias2 = Number(setedias2) + Number(db2.get(`${moment().subtract(13, 'days').format('L')}.pedidos`) || 0);
       setedias2 = Number(setedias2) + Number(db2.get(`${moment().subtract(14, 'days').format('L')}.pedidos`) || 0);
       setedias2 = Number(setedias2) + Number(db2.get(`${moment().subtract(15, 'days').format('L')}.pedidos`) || 0);
       setedias2 = Number(setedias2) + Number(db2.get(`${moment().subtract(16, 'days').format('L')}.pedidos`) || 0);
       setedias2 = Number(setedias2) + Number(db2.get(`${moment().subtract(17, 'days').format('L')}.pedidos`) || 0);
       setedias2 = Number(setedias2) + Number(db2.get(`${moment().subtract(18, 'days').format('L')}.pedidos`) || 0);
       setedias2 = Number(setedias2) + Number(db2.get(`${moment().subtract(19, 'days').format('L')}.pedidos`) || 0);
       setedias2 = Number(setedias2) + Number(db2.get(`${moment().subtract(20, 'days').format('L')}.pedidos`) || 0);
       setedias2 = Number(setedias2) + Number(db2.get(`${moment().subtract(21, 'days').format('L')}.pedidos`) || 0);
       setedias2 = Number(setedias2) + Number(db2.get(`${moment().subtract(22, 'days').format('L')}.pedidos`) || 0);
       setedias2 = Number(setedias2) + Number(db2.get(`${moment().subtract(23, 'days').format('L')}.pedidos`) || 0);
       setedias2 = Number(setedias2) + Number(db2.get(`${moment().subtract(24, 'days').format('L')}.pedidos`) || 0);
       setedias2 = Number(setedias2) + Number(db2.get(`${moment().subtract(25, 'days').format('L')}.pedidos`) || 0);
       setedias2 = Number(setedias2) + Number(db2.get(`${moment().subtract(26, 'days').format('L')}.pedidos`) || 0);
       setedias2 = Number(setedias2) + Number(db2.get(`${moment().subtract(27, 'days').format('L')}.pedidos`) || 0);
       setedias2 = Number(setedias2) + Number(db2.get(`${moment().subtract(28, 'days').format('L')}.pedidos`) || 0);
       setedias2 = Number(setedias2) + Number(db2.get(`${moment().subtract(29, 'days').format('L')}.pedidos`) || 0);
       setedias2 = Number(setedias2) + Number(db2.get(`${moment().subtract(30, 'days').format('L')}.pedidos`) || 0);

      var setediasrec2 = 0;
       setediasrec2 = Number(setediasrec2) + Number(hojerecebimentos);
       setediasrec2 = Number(setediasrec2) + Number(db2.get(`${moment().subtract(1, 'days').format('L')}.recebimentos`) || 0);
       setediasrec2 = Number(setediasrec2) + Number(db2.get(`${moment().subtract(2, 'days').format('L')}.recebimentos`) || 0);
       setediasrec2 = Number(setediasrec2) + Number(db2.get(`${moment().subtract(3, 'days').format('L')}.recebimentos`) || 0);
       setediasrec2 = Number(setediasrec2) + Number(db2.get(`${moment().subtract(4, 'days').format('L')}.recebimentos`) || 0);
       setediasrec2 = Number(setediasrec2) + Number(db2.get(`${moment().subtract(5, 'days').format('L')}.recebimentos`) || 0);
       setediasrec2 = Number(setediasrec2) + Number(db2.get(`${moment().subtract(6, 'days').format('L')}.recebimentos`) || 0);
       setediasrec2 = Number(setediasrec2) + Number(db2.get(`${moment().subtract(7, 'days').format('L')}.recebimentos`) || 0);
       setediasrec2 = Number(setediasrec2) + Number(db2.get(`${moment().subtract(8, 'days').format('L')}.recebimentos`) || 0);
       setediasrec2 = Number(setediasrec2) + Number(db2.get(`${moment().subtract(9, 'days').format('L')}.recebimentos`) || 0);
       setediasrec2 = Number(setediasrec2) + Number(db2.get(`${moment().subtract(10, 'days').format('L')}.recebimentos`) || 0);
       setediasrec2 = Number(setediasrec2) + Number(db2.get(`${moment().subtract(11, 'days').format('L')}.recebimentos`) || 0);
       setediasrec2 = Number(setediasrec2) + Number(db2.get(`${moment().subtract(12, 'days').format('L')}.recebimentos`) || 0);
       setediasrec2 = Number(setediasrec2) + Number(db2.get(`${moment().subtract(13, 'days').format('L')}.recebimentos`) || 0);
       setediasrec2 = Number(setediasrec2) + Number(db2.get(`${moment().subtract(14, 'days').format('L')}.recebimentos`) || 0);
       setediasrec2 = Number(setediasrec2) + Number(db2.get(`${moment().subtract(15, 'days').format('L')}.recebimentos`) || 0);
       setediasrec2 = Number(setediasrec2) + Number(db2.get(`${moment().subtract(16, 'days').format('L')}.recebimentos`) || 0);
       setediasrec2 = Number(setediasrec2) + Number(db2.get(`${moment().subtract(17, 'days').format('L')}.recebimentos`) || 0);
       setediasrec2 = Number(setediasrec2) + Number(db2.get(`${moment().subtract(18, 'days').format('L')}.recebimentos`) || 0);
       setediasrec2 = Number(setediasrec2) + Number(db2.get(`${moment().subtract(19, 'days').format('L')}.recebimentos`) || 0);
       setediasrec2 = Number(setediasrec2) + Number(db2.get(`${moment().subtract(20, 'days').format('L')}.recebimentos`) || 0);
       setediasrec2 = Number(setediasrec2) + Number(db2.get(`${moment().subtract(21, 'days').format('L')}.recebimentos`) || 0);
       setediasrec2 = Number(setediasrec2) + Number(db2.get(`${moment().subtract(22, 'days').format('L')}.recebimentos`) || 0);
       setediasrec2 = Number(setediasrec2) + Number(db2.get(`${moment().subtract(23, 'days').format('L')}.recebimentos`) || 0);
       setediasrec2 = Number(setediasrec2) + Number(db2.get(`${moment().subtract(24, 'days').format('L')}.recebimentos`) || 0);
       setediasrec2 = Number(setediasrec2) + Number(db2.get(`${moment().subtract(25, 'days').format('L')}.recebimentos`) || 0);
       setediasrec2 = Number(setediasrec2) + Number(db2.get(`${moment().subtract(26, 'days').format('L')}.recebimentos`) || 0);
       setediasrec2 = Number(setediasrec2) + Number(db2.get(`${moment().subtract(27, 'days').format('L')}.recebimentos`) || 0);
       setediasrec2 = Number(setediasrec2) + Number(db2.get(`${moment().subtract(28, 'days').format('L')}.recebimentos`) || 0);
       setediasrec2 = Number(setediasrec2) + Number(db2.get(`${moment().subtract(29, 'days').format('L')}.recebimentos`) || 0);
       setediasrec2 = Number(setediasrec2) + Number(db2.get(`${moment().subtract(30, 'days').format('L')}.recebimentos`) || 0);

      const embed = new Discord.MessageEmbed()
        .setTitle(`${config.get(`title`)} | Rendimentos de vendas`)
        .addField(`<:info:1072588170153185360> | Status hoje:`, `Vendas realizadas: ${hojepedidos || "0"} \nDinheiro arrecadado: R$ ${hojerecebimentos || "0"}`, false)
        .addField(`<:info:1072588170153185360> | Status 7 dias:`, `Vendas realizadas: ${setedias || "0"} \nDinheiro arrecadado: R$ ${setediasrec || "0"}`, false)
        .addField(`<:info:1072588170153185360> | Status 30 dias:`, `Vendas realizadas: ${setedias2 || "0"} \nDinheiro arrecadado: R$ ${setediasrec2 || "0"}`, false)
        .setColor(config.get(`color`))
      message.reply({embeds: [embed]})
    }
}