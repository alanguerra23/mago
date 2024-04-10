const Discord = require("discord.js")
const { JsonDatabase, } = require("wio.db");
const config = new JsonDatabase({ databasePath:"./config.json" });
const perms = new JsonDatabase({ databasePath:"./databases/myJsonPerms.json" });
const db = new JsonDatabase({ databasePath:"./databases/myJsonCupons.json" });

module.exports = {
    name: "configcupom", 
    run: async(client, message, args) => {
      if(message.author.id !== `${perms.get(`${message.author.id}_id`)}`) return message.reply(`<a:recusar:1072582282315038802>  | Você não está na lista de pessoas!`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));
      if(!args[0]) return message.reply(`<a:recusar:1072582282315038802>| Você não selecionou nenhum ID!`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));
      if(args[1]) return message.reply(`<a:recusar:1072582282315038802> | Você não pode selecionar dois IDs de uma vez!`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));
      if(args[0] !== `${db.get(`${args[0]}.idcupom`)}`) return message.reply(`<a:recusar:1072582282315038802> | Esse ID de cupom não é existente!`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));
        
      const adb = args[0];
      const row = new Discord.MessageActionRow()
        .addComponents(
          new Discord.MessageButton()
            .setCustomId('qtdcupom')
            .setEmoji('<:config:1072582261892972634>')
            .setLabel('Quantidade')
            .setStyle('SECONDARY'),
        )
        .addComponents(
          new Discord.MessageButton()
            .setCustomId('mincupom')
            .setEmoji('<:config:1072582261892972634>')
            .setLabel('Mínimo')
            .setStyle('SECONDARY'),
        )
        .addComponents(
          new Discord.MessageButton()
            .setCustomId('pctcupom')
            .setEmoji('<:config:1072582261892972634>')
            .setLabel('Porcentagem')
            .setStyle('SECONDARY'),
        )
        .addComponents(
          new Discord.MessageButton()
            .setCustomId('delcupom')
            .setEmoji('<:limpar:1072582356692652092>')
            .setLabel('Excluir')
            .setStyle('SECONDARY'),
        )
        .addComponents(
          new Discord.MessageButton()
            .setCustomId('relcupom')
            .setEmoji('<a:carregando:1072582225591283902>')
            .setLabel('Atualizar')
            .setStyle('SECONDARY'),
        );
        
        const msg = await message.reply({ embeds: [new Discord.MessageEmbed()
          .setTitle(`${config.get(`title`)} | Configurando o(a) ${adb}`)
          .setDescription(`
          <:estoque:1072582246197903451> | Quantidade: ${db.get(`${adb}.quantidade`)}
<a:acept:1072582174164914187> | Mínimo: ${db.get(`${adb}.minimo`)} Reais
<a:produto:1072582076068544633>| Desconto: ${db.get(`${adb}.desconto`)}%`)
          .setThumbnail(client.user.displayAvatarURL())
          .setColor(config.get(`color`))], components: [row]})
        const interação = msg.createMessageComponentCollector({ componentType: "BUTTON", })
        interação.on("collect", async (interaction) => {
         if (message.author.id != interaction.user.id) {
          return;
         }
                
         if (interaction.customId === "delcupom") {
           msg.delete()
           msg.channel.send("<a:acept:1072582174164914187> | Excluido!")
           db.delete(`${adb}`)
         }
         if (interaction.customId === "qtdcupom") {
             interaction.deferUpdate();
             msg.channel.send("❓ | Qual a nova quantidade de usos?").then(msg => {
               const filter = m => m.author.id === interaction.user.id;
               const collector = msg.channel.createMessageCollector({ filter, max: 1 });
               collector.on("collect", message => {
                 message.delete()
                 if (isNaN(message.content)) return msg.edit("<a:recusar:1072582282315038802>| Não coloque nenhum caractere especial além de números.")
                 db.set(`${adb}.quantidade`, `${message.content}`)
                 msg.edit("<a:acept:1072582174164914187>| Alterado!")
             })
           })
         }
         if (interaction.customId === "mincupom") {
             interaction.deferUpdate();
             msg.channel.send("❓ | Qual o novo mínimo para uso em reais?").then(msg => {
               const filter = m => m.author.id === interaction.user.id;
               const collector = msg.channel.createMessageCollector({ filter, max: 1 });
               collector.on("collect", message => {
                 message.delete()
                 db.set(`${adb}.minimo`, `${message.content.replace(",", ".")}`)
                 msg.edit("<a:acept:1072582174164914187>| Alterado!")
             })
           })
         }
         if (interaction.customId === 'pctcupom') {
             interaction.deferUpdate();
             msg.channel.send("❓ | Qual o novo desconto em porcentagem?").then(msg => {
               const filter = m => m.author.id === interaction.user.id;
               const collector = msg.channel.createMessageCollector({ filter, max: 1 });
               collector.on("collect", message => {
                 message.delete()
                 if(isNaN(message.content)) return msg.edit("<a:recusar:1072582282315038802>| Não coloque nenhum caractere especial além de números.")
                 db.set(`${adb}.desconto`, `${message.content}`)
                 msg.edit("<a:acept:1072582174164914187> | Alterado!")
             })
           })
         }
         if (interaction.customId === 'relcupom') {
           interaction.deferUpdate();
           const embed = new Discord.MessageEmbed()
             .setTitle(`${config.get(`title`)} | Configurando o(a) ${adb}`)
             .setDescription(`
<:estoque:1072582246197903451> | Quantidade: ${db.get(`${adb}.quantidade`)}
<a:acept:1072582174164914187>| Mínimo: ${db.get(`${adb}.minimo`)} Reais
<a:produto:1072582076068544633> | Desconto: ${db.get(`${adb}.desconto`)}%`)
             .setThumbnail(client.user.displayAvatarURL())
             .setColor(config.get(`color`))
           msg.edit({ embeds: [embed] })
           message.channel.send("<a:acept:1072582174164914187> | Atualizado!")
             }
           })
         }
       }