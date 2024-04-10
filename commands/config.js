const Discord = require("discord.js")
const { JsonDatabase, } = require("wio.db");
const config = new JsonDatabase({ databasePath:"./config.json" });
const perms = new JsonDatabase({ databasePath:"./databases/myJsonPerms.json" });
const db = new JsonDatabase({ databasePath:"./databases/myJsonProdutos.json" });

module.exports = {
    name: "config", 
    run: async(client, message, args) => {
        if(message.author.id !== `${perms.get(`${message.author.id}_id`)}`) return message.reply(`<a:recusar:1072582282315038802> | Você não está na lista de pessoas!`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));
        if(!args[0]) return message.reply(`<a:recusar:1072582282315038802>| Você não selecionou nenhum ID!`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));
        if(args[1]) return message.reply(`<a:recusar:1072582282315038802>| Você não pode selecionar dois IDs de uma vez!`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));
        if(args[0] !== `${db.get(`${args[0]}.idproduto`)}`) return message.reply(`<a:recusar:1072582282315038802> | Esse ID de produto não é existente!`).then(msg => setTimeout(() => msg.delete().catch(err => console.log(err)), 5000));
        
        const adb = args[0];
        const row = new Discord.MessageActionRow()
            .addComponents(
                new Discord.MessageButton()
                    .setCustomId('descgerenciar')
                    .setEmoji('<:ticketlogsa:1072609428219629598>')
                    .setLabel('Descrição')
                    .setStyle('SUCCESS'),
            )
            .addComponents(
                new Discord.MessageButton()
                    .setCustomId('bangerenciar')
                    .setEmoji('<:ticketlogsa:1072609428219629598>')
                    .setLabel('Banner')
                    .setStyle('SUCCESS'),
            )
            .addComponents(
                new Discord.MessageButton()
                    .setCustomId('nomegerenciar')
                    .setEmoji('<a:produto:1072582076068544633>')
                    .setLabel('Nome')
                    .setStyle('SUCCESS'),
            )
            .addComponents(
                new Discord.MessageButton()
                    .setCustomId('precogerenciar')
                    .setEmoji('<:dinheiro:1072582093172920411>')
                    .setLabel('Preço')
                    .setStyle('SUCCESS'),
            )
            .addComponents(
                new Discord.MessageButton()
                    .setCustomId('deletegerenciar')
                    .setEmoji('<:limpar:1072582356692652092>')
                    .setLabel('Excluir')
                    .setStyle('DANGER'),
            )

            const row2 = new Discord.MessageActionRow()
            .addComponents(
                new Discord.MessageButton()
                    .setCustomId('rolegerenciar')
                    .setEmoji('<:limpar:1072582356692652092>')
                    .setLabel('Cargo')
                    .setStyle('SUCCESS'),
            )
				  .addComponents(
                new Discord.MessageButton()
                    .setCustomId('tempogerenciar')
                    .setEmoji('<:limpar:1072582356692652092>')
                    .setLabel('Tempo de Assinatura')
                    .setStyle('SUCCESS'),
            )
            
            .addComponents(
                new Discord.MessageButton()
                    .setCustomId('rlgerenciar')
                    .setEmoji('<a:carregando:1072582225591283902>')
                    .setLabel('Atualizar')
                    .setStyle('PRIMARY')
            )
           
        
            const msg = await message.reply({ embeds: [new Discord.MessageEmbed()
                .setTitle(`${config.get(`title`)} | Configurando o(a) ${adb}`)
                .setDescription(`
<:ticketlogsa:1072609428219629598>| Descrição: \`\`\` ${db.get(`${adb}.desc`)}\`\`\`
<a:produto:1072582076068544633> | Nome: ${db.get(`${adb}.nome`)}
<:dinheiro:1072582093172920411> | Preço: ${db.get(`${adb}.preco`)} Reais
<:dinheiro:1072582093172920411> | Cargo: ${db.get(`${adb}.roleid`)} 
<:estoque:1072582246197903451>| Estoque: ${db.get(`${adb}.conta`).length}`)
                .setThumbnail(client.user.displayAvatarURL())
                .setColor(config.get(`color`))], components: [row, row2]})
            const interação = msg.createMessageComponentCollector({
               componentType: "BUTTON",
            })
  
            interação.on("collect", async (interaction) => {
               if (message.author.id != interaction.user.id) {
               return;
            }
                
                if (interaction.customId === "deletegerenciar") {
                    msg.delete()
                    msg.channel.send("<a:acept:1072582174164914187>| Excluido!")
                    db.delete(adb)
                }

                if (interaction.customId === "bangerenciar") {
                    interaction.deferUpdate();
                     msg.channel.send("❓ | Qual o novo link do banner?").then(msg => {
                         const filter = m => m.author.id === interaction.user.id;
                         const collector = msg.channel.createMessageCollector({ filter, max: 1 });
                         collector.on("collect", message => {
                             message.delete()
                             db.set(`${adb}.banner`, message.content)
                             msg.edit("<a:acept:1072582174164914187> | Alterado!")
                         })
                     })
                 }

                if (interaction.customId === "precogerenciar") {
                   interaction.deferUpdate();
                    msg.channel.send("❓ | Qual o novo preço?").then(msg => {
                        const filter = m => m.author.id === interaction.user.id;
                        const collector = msg.channel.createMessageCollector({ filter, max: 1 });
                        collector.on("collect", message => {
                            message.delete()
                            db.set(`${adb}.preco`, Number(message.content.replace(",", ".")))
                            msg.edit("<a:acept:1072582174164914187> | Alterado!")
                        })
                    })
                }
                if (interaction.customId === "nomegerenciar") {
        interaction.deferUpdate();
                    msg.channel.send("❓ | Qual o novo nome?").then(msg => {
                        const filter = m => m.author.id === interaction.user.id;
                        const collector = msg.channel.createMessageCollector({ filter, max: 1 });
                        collector.on("collect", message => {
                            message.delete()
                            db.set(`${adb}.nome`, `${message.content}`)
                            msg.edit("<a:acept:1072582174164914187>| Alterado!")
                        })
                    })
                }
    if (interaction.customId === 'descgerenciar') {
        interaction.deferUpdate();
                    msg.channel.send("❓ | Qual a nova descrição?").then(msg => {
                        const filter = m => m.author.id === interaction.user.id;
                        const collector = msg.channel.createMessageCollector({ filter, max: 1 });
                        collector.on("collect", message => {
                            message.delete()
                            db.set(`${adb}.desc`, `${message.content}`)
                            msg.edit("<a:acept:1072582174164914187> | Alterado!")
                        })
                    })
                }
				if (interaction.customId === "tempogerenciar") {
                    interaction.deferUpdate();
                    msg.channel.send("❓ | Qual o novo tempo da role em segundos?").then((msg) => {
                      const filter = (m) => m.author.id === interaction.user.id;
                      const collector = msg.channel.createMessageCollector({ filter, max: 1 });
                      collector.on("collect", (message) => {
                        message.delete();
                        db.set(`${adb}.expirationSeconds`, message.content); // Updated line to set the new role ID
                        msg.edit("<a:acept:1072582174164914187> | Alterado!");
                      });
                    });
                  }
                if (interaction.customId === "rolegerenciar") {
                    interaction.deferUpdate();
                    msg.channel.send("❓ | Qual a nova Roleid?").then((msg) => {
                      const filter = (m) => m.author.id === interaction.user.id;
                      const collector = msg.channel.createMessageCollector({ filter, max: 1 });
                      collector.on("collect", (message) => {
                        message.delete();
                        db.set(`${adb}.roleid`, message.content); // Updated line to set the new role ID
                        msg.edit("<a:acept:1072582174164914187> | Alterado!");
                      });
                    });
                  }
    if (interaction.customId === 'rlgerenciar') {
        interaction.deferUpdate();
         const embed = new Discord.MessageEmbed()
           .setTitle(`${config.get(`title`)} | Configurando o(a) ${adb}`)
           .setDescription(`
<:ticketlogsa:1072609428219629598>| Descrição: \`\`\` ${db.get(`${adb}.desc`)}\`\`\`
<a:produto:1072582076068544633>| Nome: ${db.get(`${adb}.nome`)}
<:dinheiro:1072582093172920411> | Preço: ${db.get(`${adb}.preco`)} Reais
<a:produto:1072582076068544633>| Cargo: ${db.get(`${adb}.roleid`)}
<:estoque:1072582246197903451> | Estoque: ${db.get(`${adb}.conta`).length}`)
           .setThumbnail(client.user.displayAvatarURL())
           .setColor(config.get(`color`))
        if(db.get(`${adb}.banner`)){
            embed.setImage(db.get(`${adb}.banner`))
        }
           msg.edit({ embeds: [embed] })
           message.channel.send("<a:acept:1072582174164914187> | Atualizado!")
                }
              })
            }
           }