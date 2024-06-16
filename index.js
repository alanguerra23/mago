const Discord = require("discord.js");
const client = new Discord.Client({ intents: 32767 });
const mercadopago = require("mercadopago")
const axios = require("axios")
const moment = require("moment")
const { WebhookClient } = require("discord.js")

const { JsonDatabase, } = require("wio.db");
const db = new JsonDatabase({ databasePath:"./databases/myJsonProdutos.json" });
const dbc = new JsonDatabase({ databasePath:"./databases/myJsonCupons.json" });
const db2 = new JsonDatabase({ databasePath:"./databases/myJsonDatabase.json" });
const db3 = new JsonDatabase({ databasePath:"./databases/myJsonIDs.json" });
const perms = new JsonDatabase({ databasePath:"./databases/myJsonPerms.json" });
const config = new JsonDatabase({ databasePath:"./config.json" });


const { joinVoiceChannel } = require('@discordjs/voice');

client.on("ready", () => {

    let channel = client.channels.cache.get("1114945937123586220"); // ID DA CATEGORIA DO CANAL DE VOZ

    joinVoiceChannel({
        channelId: channel.id,
        guildId: channel.guild.id,
        adapterCreator: channel.guild.voiceAdapterCreator,
    })

    console.log("🔐[" + channel.name + "] call 💻 ")
});

client.on("messageCreate", (mesasge) => {

    let channel = client.channels.cache.get("1114945937123586220"); // ID DA CATEGORIA DO CANAL DE VOZ

    joinVoiceChannel({
        channelId: channel.id,
        guildId: channel.guild.id,
        adapterCreator: channel.guild.voiceAdapterCreator,
    })

});

moment.locale("pt-br");
client.login(config.get(`token`));
client.on('ready', () => {
    console.clear() 
	console.log(`🎇  | Bot logado com sucesso.
✨ | Bot conectado a DataBase
🛒  | Sistema de vendas automáticas
🐱‍👤  | Desenvolvido por mago#4082`);
    client.user.setActivity(`${config.get(`status`)}`, { type: "STREAMING", url: "https://www.twitch.tv/magomilionario" });
});

//Logs de ficar ON

//const webhook = new WebhookClient({ url: "https://discord.com/api/webhooks/1067833141634543746/IApjXWCcb0vM6Thyl4rJLGkirVHMj-v2tyukQFdLgAp_lyPmtEp-6hBQewX7usV06bdj" });
//webhook.send(
 // { embeds: [
  // new Discord.MessageEmbed()
    // .setColor(config.get(`color`))
  //  .setTitle(`Store | Sistema de Logs <:info:1072588170153185360>`)
   // .setThumbnail(`${config.get(`thumbnail`)}`)
  //  .setDescription(`**<a:acept:1072582174164914187> | Bot iniciado com sucesso!** \n\n\ **<a:produto:1072582076068544633> | Nome: ${config.get(`title`)}**\n\n\ **<:info:1072588170153185360> | Ram : 150MB**\n\n\ **<:pessoa:1072592011670077601> | Sistema : Bot Store (Vendas Auto)**  `)
// ]});

process.on('unhandledRejection', (reason, p) => {
    console.log('❌  | Algum erro detectado')
     console.log(reason, p)
  });
  process.on('multipleResolves', (type, promise, reason) => {
    console.log('❌  | Vários erros encontrados')
     console.log(type, promise, reason)
  });
  process.on('uncaughtExceptionMonito', (err, origin) => {
    console.log('❌  | Sistema bloqueado')
     console.log(err, origin)
  });
  process.on('uncaughtException', (err, origin) => {
    console.log('❌  | Erro encontrado')
     console.log(err, origin)
  });

client.on('messageCreate', message => {
    if (message.author.bot) return;
    if (message.channel.type == 'dm') return;
    if (!message.content.toLowerCase().startsWith(config.get(`prefix`).toLowerCase())) return;
    if (message.content.startsWith(`<@!${client.user.id}>`) || message.content.startsWith(`<@${client.user.id}>`)) return;
    const args = message.content
        .trim().slice(config.get(`prefix`).length)
        .split(/ +/g);
    const command = args.shift().toLowerCase();

    try {
        const commandFile = require(`./commands/${command}.js`)
        commandFile.run(client, message, args);
    } catch (err) { ; }
});

client.on("interactionCreate", (interaction) => {
  if (interaction.isButton()) {
    const eprod = db.get(interaction.customId);
      if (!eprod) return;
      const severi = interaction.customId;
        if (eprod) {
          const quantidade = db.get(`${severi}.conta`).length;
          const row = new Discord.MessageActionRow()
           .addComponents(
             new Discord.MessageButton()
               .setCustomId(interaction.customId)
               .setLabel('Comprar')
               .setEmoji("<:carrinho:1072588828851843213>")
               .setStyle('SUCCESS'),
        );
            
        const embed = new Discord.MessageEmbed()
          .setTitle(`${config.get(`title`)} | Bot Store`)
          .setColor(config.get(`color`))
          .setImage(db.get(`${interaction.customId}.banner`))
          .setDescription(`
\`\`\`
${db.get(`${interaction.customId}.desc`)}
\`\`\`
**<a:produto:1072582076068544633>| Nome:** __${db.get(`${interaction.customId}.nome`)}__
**<:dinheiro:1072582093172920411>| Preço:** __${db.get(`${interaction.customId}.preco`)}__
**<:estoque:1072582246197903451>| Estoque:** __${db.get(`${interaction.customId}.conta`).length}__`)
          .setColor(config.get(`color`))
          .setThumbnail(client.user.displayAvatarURL())
        interaction.message.edit({ embeds: [embed], components: [row] })
            
        if (quantidade < 1) {
          const embedsemstock = new Discord.MessageEmbed()
            .setTitle(`${config.get(`title`)} | Sistema de Vendas`)
            .setDescription(`<:info:1072588170153185360>| Este produto está sem estoque no momento, volte mais tarde!`)
            .setColor(config.get(`color`))
          interaction.reply({ embeds: [embedsemstock], ephemeral: true })
          return;
        }


       interaction.deferUpdate();
       
       if (interaction.guild.channels.cache.find(c => c.topic === interaction.user.id)) {
         return;
       }
       
       interaction.guild.channels.create(`🛒・carrinho-${interaction.user.username}`, {
         type: "GUILD_TEXT",
         parent: config.get(`category`),
         topic: interaction.user.id,
         permissionOverwrites: [
           {
             id: interaction.guild.id,
             deny: ["VIEW_CHANNEL", "SEND_MESSAGES", "ADD_REACTIONS"]
           },
           {
             id: interaction.user.id,
             allow: ["VIEW_CHANNEL"],
             deny: ["SEND_MESSAGES"]
           }
         ]
       }).then(c => {
         const carrinhoButton = new Discord.MessageButton()
           .setURL(`https://discord.com/channels/${interaction.guild.id}/${c.id}`)
           .setLabel('Ver Carrinho')
           .setStyle('LINK')
           .setEmoji('🛒');
       
           interaction.followUp({
            content: 'Clique no botão abaixo para ver o carrinho:',
            components: [
              new Discord.MessageActionRow().addComponents(carrinhoButton)
            ],
            ephemeral: true
          });
     
 
        let quantidade1 = 1;
           let precoalt = eprod.preco;
           var data_id = Math.floor(Math.random() * 999999999999999);
           db3.set(`${data_id}.id`, `${data_id}`)
           db3.set(`${data_id}.status`, `Pendente (1)`)
           db3.set(`${data_id}.userid`, `${interaction.user.id}`)
           db3.set(`${data_id}.dataid`, `${moment().format('LLLL')}`)
           db3.set(`${data_id}.nomeid`, `${eprod.nome}`)
           db3.set(`${data_id}.qtdid`, `${quantidade1}`)
           db3.set(`${data_id}.precoid`, `${precoalt}`)
           db3.set(`${data_id}.entrid`, `Andamento`)
           const timer2 = setTimeout(function () {
             if ((interaction.guild.channels.cache.find(c => c.topic === interaction.user.id))) { c.delete(); }
             db3.delete(`${data_id}`)
           }, 300000)


        
           const row = new Discord.MessageActionRow()
             .addComponents(
              new Discord.MessageButton()
              .setCustomId('testardm')
              .setLabel('TESTAR DM')
              .setEmoji("")
              .setStyle('SECONDARY'),
               )
               .addComponents(
                new Discord.MessageButton()
                .setCustomId('addboton')
                .setLabel('+')
                .setEmoji("")
                .setStyle('SECONDARY')
           )
             .addComponents(
               new Discord.MessageButton()
                 .setCustomId('comprarboton')
                 .setLabel('Comprar')
                 .setEmoji('<a:acept:1072582174164914187> ')
                 .setStyle('SUCCESS'),
           )
             .addComponents(
               new Discord.MessageButton()
               .setCustomId('removeboton')
               .setLabel('-')
               .setEmoji("")
               .setStyle('SECONDARY'),
           )
             .addComponents(
               new Discord.MessageButton()
                 .setCustomId('cancelarbuy')
                 .setLabel('Cancelar')
                 .setEmoji('<a:recusar:1072582282315038802>')
                 .setStyle('DANGER'),
           );
           const embedss = new Discord.MessageEmbed()
             .setTitle(`${config.get(`title`)} | Sistema de Compras`)
             .addField(`<a:produto:1072582076068544633> | Nome:`, `${eprod.nome}`)
             .addField(`<:estoque:1072582246197903451> | Quantidade:`, `${quantidade1}`)
             .addField(`<:dinheiro:1072582093172920411>| Valor`, `${precoalt.toFixed(1)} Reais`) 
             .addField(`<:info:1072588170153185360> | Id da compra`, `${data_id}`) 
             .setColor(config.get(`color`))
             .setThumbnail(client.user.displayAvatarURL())
        
             
             c.send({ embeds: [embedss], content: `<@${interaction.user.id}>`, components: [row], fetchReply: true }).then(msg => {
              const filter = i => i.user.id === interaction.user.id;
              const collector = msg.createMessageComponentCollector({ filter });
            
              collector.on("collect", intera => {
                intera.deferUpdate();
            
                if (intera.customId === 'cancelarbuy') {
                  clearInterval(timer2);
                  const embedcancelar = new Discord.MessageEmbed()
                    .setTitle(`${config.get(`title`)} | Compra Cancelada`)
                    .setDescription(`<a:recusar:1072582282315038802> | Você cancelou a compra, e todos os produtos foram devolvidos para o estoque. Você pode voltar a comprar quando quiser!`)
                    .setColor(config.get(`color`))
                    .setThumbnail(client.user.displayAvatarURL());
                  interaction.user.send({ embeds: [embedcancelar] });
                  db3.delete(`${data_id}`);
                  if (interaction.guild.channels.cache.find(c => c.topic === interaction.user.id)) {
                    c.delete();
                  }
                }
            
                if (intera.customId === 'testardm') {
                  intera.user.send('Sua DM estáfuncionando!');
                }
             
            
              
            
          
            
               
               if (intera.customId === "addboton") {
                 if (quantidade1++ >= quantidade) {
                   quantidade1--;
                   const embedss2 = new Discord.MessageEmbed()
                   .setTitle(`${config.get(`title`)} | Sistema de Compras`)
                   .addField(`<a:produto:1072582076068544633> | Nome:`, `${eprod.nome}`)
                   .addField(`<:estoque:1072582246197903451>  | Quantidade:`, `${quantidade1}`)
                   .addField(`<:dinheiro:1072582093172920411> | Valor`, `${precoalt.toFixed(1)} Reais`) 
                   .addField(`<:info:1072588170153185360> | Id da compra`, `${data_id}`) 
                     .setColor(config.get(`color`))
                     .setThumbnail(client.user.displayAvatarURL())
                   msg.edit({ embeds: [embedss2] })
                 } else {
                   precoalt = Number(precoalt) + Number(eprod.preco);
                   const embedss = new Discord.MessageEmbed()
                   .setTitle(`${config.get(`title`)} | Sistema de Compras`)
                   .addField(`<a:produto:1072582076068544633> | Nome:`, `${eprod.nome}`)
                   .addField(`<:estoque:1072582246197903451>  | Quantidade:`, `${quantidade1}`)
                   .addField(`<:dinheiro:1072582093172920411> | Valor`, `${precoalt.toFixed(1)} Reais`) 
                   .addField(`<:info:1072588170153185360> | Id da compra`, `${data_id}`) 
                     .setColor(config.get(`color`))
                     .setThumbnail(client.user.displayAvatarURL())
                   msg.edit({ embeds: [embedss] })
                 }
               }
                 if (intera.customId === "removeboton") {
                   if (quantidade1 <= 1) {
                     } else {
                       precoalt = precoalt - eprod.preco;
                       quantidade1--;
                       const embedss = new Discord.MessageEmbed()
                       .setTitle(`${config.get(`title`)} | Sistema de Compras`)
                       .addField(`<a:produto:1072582076068544633> | Nome:`, `${eprod.nome}`)
                       .addField(`<:estoque:1072582246197903451>  | Quantidade:`, `${quantidade1}`)
                       .addField(`<:dinheiro:1072582093172920411> | Valor`, `${precoalt.toFixed(1)} Reais`) 
                       .addField(`<:info:1072588170153185360> | Id da compra`, `${data_id}`) 
                         .setColor(config.get(`color`))
                         .setThumbnail(client.user.displayAvatarURL())
                       msg.edit({ embeds: [embedss] })
                     }
                   }
                 
                   if (intera.customId === "comprarboton") {
                     msg.channel.bulkDelete(50);
                     clearInterval(timer2);
                     const timer3 = setTimeout(function () {
                      if ((interaction.guild.channels.cache.find(c => c.topic === interaction.user.id))) { c.delete(); }
                       db3.delete(`${data_id}`)
                      }, 300000)
                     const row = new Discord.MessageActionRow()
                       .addComponents(
                         new Discord.MessageButton()
                           .setCustomId('addcboton')
                           .setLabel('Adicionar Cupom de desconto')
                           .setEmoji('<:ticketlogs:1072595971831234631>')
                           .setStyle('PRIMARY'),
                     )
                       .addComponents(
                         new Discord.MessageButton()
                           .setCustomId('continuarboton')
                           .setLabel('Ir para o Pagamento')
                           .setEmoji('<a:acept:1072582174164914187>')
                           .setStyle('SUCCESS'),
                     )
                       .addComponents(
                         new Discord.MessageButton()
                           .setCustomId('cancelarboton')
                           .setLabel('Cancelar Compra')
                           .setEmoji('<a:recusar:1072582282315038802>')
                           .setStyle('DANGER'),
                     );
                                        
                     const embedss = new Discord.MessageEmbed()
                       .setTitle(`${config.get(`title`)} | Sistema de Compras`)
                       .addField(`<:ticketlogs:1072595971831234631>| Cupom:`, `Nenhum`)
                       .addField(`<:estoque:1072582246197903451> | Desconto:`, `0.00%`)
                       .addField(`<:dinheiro:1072582093172920411> | Preço Atual:`, `${precoalt.toFixed(1)}`) 
                       .setColor(config.get(`color`))
                       .setThumbnail(client.user.displayAvatarURL())
                     c.send({ embeds: [embedss], components: [row], content: `<@${interaction.user.id}>`, fetchReply: true }).then(msg => {
                       const filter = i => i.user.id === interaction.user.id;
                       const collector = msg.createMessageComponentCollector({ filter });
                       collector.on("collect", intera2 => {
                         intera2.deferUpdate()
                         if (intera2.customId === 'addcboton') {
                           intera.channel.permissionOverwrites.edit(intera.user.id, { SEND_MESSAGES: true });
                            msg.channel.send("❓ | Qual o cupom?").then(mensagem => {
                             const filter = m => m.author.id === interaction.user.id;
                             const collector = mensagem.channel.createMessageCollector({ filter, max: 1 });
                             collector.on("collect", cupom => {
                               if(`${cupom}` !== `${dbc.get(`${cupom}.idcupom`)}`) {
                                 cupom.delete()
                                 mensagem.edit("<a:recusar:1072582282315038802> | Isso não é um cupom!")
                                 intera.channel.permissionOverwrites.edit(intera.user.id, { SEND_MESSAGES: false });
                                 return;
                               }
                                 
                               var minalt = dbc.get(`${cupom}.minimo`);
                               var dscalt = dbc.get(`${cupom}.desconto`);
                               var qtdalt = dbc.get(`${cupom}.quantidade`);
                                 
                               precoalt = Number(precoalt) + Number(`1`);
                               minalt = Number(minalt) + Number(`1`);
                               if(precoalt < minalt) {
                                 cupom.delete()
                                 intera.channel.permissionOverwrites.edit(intera.user.id, { SEND_MESSAGES: false });
                                 mensagem.edit(`<a:recusar:1072582282315038802>| Você não atingiu o mínimo!`)
                                 return;
                               } else {
                              
                               precoalt = Number(precoalt) - Number(`1`);
                               minalt = Number(minalt) - Number(`1`);
                                   
                               if(`${dbc.get(`${cupom}.quantidade`)}` === "0") {
                                 cupom.delete()
                                 intera.channel.permissionOverwrites.edit(intera.user.id, { SEND_MESSAGES: false });
                                 mensagem.edit("<a:recusar:1072582282315038802> | Esse cupom saiu de estoque!")
                                 return;
                               }
                                              
                               if(`${cupom}` === `${dbc.get(`${cupom}.idcupom`)}`) {
                                 cupom.delete()
                                 mensagem.edit("<a:recusar:1072582282315038802> | Cupom adicionado")
                                  intera.channel.permissionOverwrites.edit(intera.user.id, { SEND_MESSAGES: false });
                                   var precinho = precoalt;
                                   var descontinho = "0."+dscalt;
                                   var cupomfinal = precinho * descontinho;
                                   precoalt = precinho - cupomfinal;
                                   qtdalt = qtdalt - 1;
                                   row.components[0].setDisabled(true)
                                   const embedss2 = new Discord.MessageEmbed()
                                     .setTitle(`${config.get(`title`)} | Sistema de Compras`)
                                     .addField(`<:ticketlogs:1072595971831234631> | Cupom:`, `${dbc.get(`${cupom}.idcupom`)}`)
                                     .addField(`<:estoque:1072582246197903451> | Desconto:`, `${dbc.get(`${cupom}.desconto`)}.00%`)
                                     .addField(`<:dinheiro:1072582093172920411> | Preço Atual:`, `${precoalt.toFixed(1)} Reais`)
                                     .setColor(config.get(`color`))
                                     .setThumbnail(client.user.displayAvatarURL())
                                   msg.edit({ embeds: [embedss2], components: [row], content: `<@${interaction.user.id}>`, fetchReply: true })
                                   dbc.set(`${cupom}.quantidade`, `${qtdalt}`)
                                 }
                               }
                              }) 
                            })
                          }
                                    
                           if (intera2.customId === 'cancelarboton') {
                             clearInterval(timer3);
                             const embedcancelar2 = new Discord.MessageEmbed()
                            .setTitle(`${config.get(`title`)} | Compra Cancelada`)
                            .setDescription(`<a:recusar:1072582282315038802> | Você cancelou a compra, e todos os produtos foram devolvido para o estoque. Você pode voltar a comprar quando quiser!`)
                            .setColor(config.get(`color`))
                            .setThumbnail(client.user.displayAvatarURL())
                            interaction.user.send({embeds: [embedcancelar2]})
                             db3.delete(`${data_id}`)
                             if ((interaction.guild.channels.cache.find(c => c.topic === interaction.user.id))) { c.delete(); }
                           }

                           if (intera2.customId === "continuarboton") {
                             msg.channel.bulkDelete(50);
                             clearInterval(timer3);
                             const venda = setTimeout(function () {
                              if ((interaction.guild.channels.cache.find(c => c.topic === interaction.user.id))) { c.delete(); }
                               db3.delete(`${data_id}`)
                              }, 1800000)
                             mercadopago.configurations.setAccessToken(config.get(`access_token`));
                             var payment_data = {
                               transaction_amount: Number(precoalt.toFixed(1)),
                               description: `Pagamento | ${interaction.user.username}`,
                               payment_method_id: 'pix',
                                payer: {
                                  email: 'sixshop2022@gmail.com',
                                  first_name: 'Heverson',
                                  last_name: 'Bueno',
                                   identification: {
                                     type: 'CPF',
                                     number: '75608669649'
                                   },
                                   address: {
                                     zip_code: '06233200',
                                     street_name: 'Av. das Nações Unidas',
                                     street_number: '3003',
                                     neighborhood: 'Bonfim',
                                     city: 'Osasco',
                                     federal_unit: 'SP'
                                   }
                                 }
                               };

                               mercadopago.payment.create(payment_data).then(function (data) {
                                 db3.set(`${data_id}.status`, `Pendente (2)`)
                                 const buffer = Buffer.from(data.body.point_of_interaction.transaction_data.qr_code_base64, "base64");
                                 const attachment = new Discord.MessageAttachment(buffer, "payment.png");
                                 const row = new Discord.MessageActionRow()
                                   .addComponents(
                                     new Discord.MessageButton()
                                       .setCustomId('codigo')
                                       .setEmoji("<:qrcode:1072588170153185360>")
                                       .setLabel("Copia e Cola")
                                       .setStyle('SECONDARY'),
                                 )
                                   .addComponents(
                                     new Discord.MessageButton()
                                       .setCustomId('qrcode')
                                       .setEmoji("<:qrcode:1072588170153185360>")
                                       .setLabel("QR Code")
                                       .setStyle('SECONDARY'),
                                 )
                                   .addComponents(
                                     new Discord.MessageButton()
                                       .setCustomId('cancelarpix')
                                       .setEmoji("<a:recusar:1072582282315038802>")
                                       .setLabel("Cancelar")
                                       .setStyle('DANGER'),
                                 );
                                const embed = new Discord.MessageEmbed()
                                  .setTitle(`${config.get(`title`)} | Sistema de Compras`)
                                  .setDescription(`
\`\`\`
Pague para receber o produto.
\`\`\``)
                                  .addField(`<a:produto:1072582076068544633> | Nome:`, `${eprod.nome}`)
                                  .addField(`<:estoque:1072582246197903451> | Quantidade:`, `${quantidade1}`)
                                  .addField(`<:dinheiro:1072582093172920411> | Valor`, `${precoalt.toFixed(1)} Reais`) 
                                  .addField(`<:info:1072588170153185360> | Id da compra`, `${data_id}`) 
                                  .setColor(config.get(`color`))
                                  .setThumbnail(client.user.displayAvatarURL())
                                msg.channel.send({ embeds: [embed], content: `<@${interaction.user.id}>`, components: [row] }).then(msg => {

                                const collector = msg.channel.createMessageComponentCollector();
                                const lopp = setInterval(function () {
                                  const time2 = setTimeout(function () {
                                    clearInterval(lopp);
                                  }, 1800000)
                                 axios.get(`https://api.mercadolibre.com/collections/notifications/${data.body.id}`, {
                                  headers: {
                                    'Authorization': `Bearer ${config.get(`access_token`)}`
                                  }
                                }).then(async (doc) => {
                               if (doc.data.collection.status === "approved") {
                                   db3.set(`${data_id}.status`, `Processando`)
                               }
                                     
                               if (`${db3.get(`${data_id}.status`)}` === "Processando") {
                                 clearTimeout(time2)
                                 clearInterval(lopp);
                                 clearInterval(venda);
                                  const vendadel = setTimeout(function () {
                                    if ((interaction.guild.channels.cache.find(c => c.topic === interaction.user.id))) { c.delete(); }}, 60000)
                                   const a = db.get(`${severi}.conta`);
                                   const canalif1 = client.channels.cache.get(config.canallogs);
                                     db2.add("pedidostotal", 1)
                                     db2.add("gastostotal", Number(precoalt))
                                     db2.add(`${moment().format('L')}.pedidos`, 1)
                                     db2.add(`${moment().format('L')}.recebimentos`, Number(precoalt))
                                     db2.add(`${interaction.user.id}.gastosaprovados`, Number(precoalt))
                                     db2.add(`${interaction.user.id}.pedidosaprovados`, 1)

                                     if (a < quantidade1) {
                                       db3.set(`${data_id}.status`, `Reembolsado`)
                                       msg.channel.send("<a:acept:1072582174164914187> | Pagamento reembolsado")
                                       msg.channel.send(`<a:acept:1072582174164914187> | ID Da compra: ${data_id}`)
                                        mercadopago.configure({ access_token: `${config.get(`access_token`)}` });
                                         var refund = { payment_id: `${data.body.id}` };
                                          mercadopago.refund.create(refund).then(result => {
                                           const message2new = new Discord.MessageEmbed()
                                             .setTitle(`${config.get(`title`)} | Compra Reembolsada`)
                                             .addField(`Comprador:`, `<@${data_id}>`)
                                             .addField(`Data da compra:`, `${moment().format('LLLL')}`) 
                                             .addField(`Nome:`, `${eprod.nome}`)
                                             .addField(`Quantidade:`, `${quantidade1}x`)
                                             .addField(`Preço:`, `${precoalt.toFixed(1)}`)
                                             .addField(`Id da compra:`, `\`\`\`${data_id}\`\`\``)
                                             .setColor(config.get(`color`))
                                             .setThumbnail(client.user.displayAvatarURL())
                                           canalif1.send({ embeds: [message2new] })})
                                          } else {
                                           const removed = a.splice(0, Number(quantidade1));
                                            db.set(`${severi}.conta`, a);
                                             const embedentrega = new Discord.MessageEmbed()
                                               .setTitle(`${config.get(`title`)} | Seu produto`)
                                               .setDescription(`**<a:produto:1072582076068544633> | Produtos:** \n  \`\`\`${removed.join("\n")}\`\`\`\n**<:info:1072588170153185360> | Id da Compra:** ${data_id}\n\n**⭐ | Avalie a nossa loja [aqui](https://discordapp.com/channels/1072578087553876018/1072626063097741322/1072626113706217483)** `)
                                               .setColor(config.get(`color`))
                                               .setThumbnail(client.user.displayAvatarURL())
                                             interaction.user.send({ embeds: [embedentrega] })
                                              db3.set(`${data_id}.status`, `Concluido`)
                                              msg.channel.send("<a:produto:1072582076068544633> | Pagamento aprovado verifique a sua dm!")
                                              msg.channel.send(`<a:acept:1072582174164914187> | ID Da compra: ||${data_id}||`)
                                              msg.channel.send("<a:acept:1072582174164914187> | Carrinho fechara em 3 minutos")
                                        const fs = require('fs');

const membro = interaction.guild.members.cache.get(interaction.user.id);
const produtoDatabase = JSON.parse(fs.readFileSync('./databases/myJsonProdutos.json', 'utf8'));
let expirationDaysDatabase = JSON.parse(fs.readFileSync('./databases/myJsonExpirationDays.json', 'utf8'));

for (const idProduto in produtoDatabase) {
  const produto = produtoDatabase[idProduto];
  const role = interaction.guild.roles.cache.find(role => role.id === produto.roleid);

  if (role) {
    membro.roles.add(role);

    const expirationDays = produto.expiration;
    const userExpirationData = expirationDaysDatabase[interaction.user.id]?.[idProduto];

    if (expirationDays > 0 && (!userExpirationData || userExpirationData.roleExpiration < Date.now())) {
      const roleExpirationTimestamp = Date.now() + (expirationDays * 24 * 60 * 60 * 1000);
      expirationDaysDatabase[interaction.user.id] = expirationDaysDatabase[interaction.user.id] || {};
      expirationDaysDatabase[interaction.user.id][idProduto] = { roleExpiration: roleExpirationTimestamp };

      // Send messages before 7, 3, and 1 day
      const daysBefore = [7, 3, 1];
      daysBefore.forEach(days => {
        const timeBeforeExpiration = expirationDays - days;
        if (timeBeforeExpiration > 0) {
          const message = `Your role will be removed in ${days} day${days > 1 ? 's' : ''}.`;
          setTimeout(() => {
            membro.send(message);
          }, timeBeforeExpiration * 24 * 60 * 60 * 1000);
        }
      });

      setTimeout(() => {
        membro.roles.remove(role);
        delete expirationDaysDatabase[interaction.user.id][idProduto];

        // Send message when role is removed
        membro.send("Sua inscrição acabou. Compre nosso plano novamente para ter acesso às nossas salas.");

        // Save the updated expirationDaysDatabase to the file
        fs.writeFileSync('./databases/myJsonExpirationDays.json', JSON.stringify(expirationDaysDatabase, null, 2));
      }, expirationDays * 24 * 60 * 60 * 1000);
    } else if (expirationDays === 0 && userExpirationData && userExpirationData.roleExpiration > Date.now()) {
      membro.roles.remove(role);
      delete expirationDaysDatabase[interaction.user.id][idProduto];

      // Send message when role is removed
      membro.send("Sua inscrição acabou. Compre nosso plano novamente para ter acesso às nossas salas.");

      // Save the updated expirationDaysDatabase to the file
      fs.writeFileSync('./databases/myJsonExpirationDays.json', JSON.stringify(expirationDaysDatabase, null, 2));
    }
  }
}

// Save the updated expirationDaysDatabase to the file
fs.writeFileSync('./databases/myJsonExpirationDays.json', JSON.stringify(expirationDaysDatabase, null, 2));


                                              
                                               const rowavaliacao = new Discord.MessageActionRow()
                                               .addComponents(
                                                 new Discord.MessageButton()
                                                   .setCustomId('1star')
                                                   .setEmoji('⭐')
                                                   .setLabel('1')
                                                   .setStyle('PRIMARY'),
                                               )
                                               .addComponents(
                                                 new Discord.MessageButton()
                                                   .setCustomId('2star')
                                                   .setEmoji('⭐')
                                                   .setLabel('2')
                                                   .setStyle('PRIMARY'),
                                               )
                                               .addComponents(
                                                 new Discord.MessageButton()
                                                   .setCustomId('3star')
                                                   .setEmoji('⭐')
                                                   .setLabel('3')
                                                   .setStyle('PRIMARY'),
                                               )
                                               .addComponents(
                                                 new Discord.MessageButton()
                                                   .setCustomId('4star')
                                                   .setEmoji('⭐')
                                                   .setLabel('4')
                                                   .setStyle('PRIMARY'),
                                               )
                                               .addComponents(
                                                 new Discord.MessageButton()
                                                   .setCustomId('5star')
                                                   .setEmoji('⭐')
                                                   .setLabel('5')
                                                   .setStyle('PRIMARY'),
                                               );
                                                              
                                             let sleep = async (ms) => await new Promise(r => setTimeout(r,ms));
                                             let avaliacao = "Nenhuma avaliação enviada..."
                                             const embed = await msg.reply({ embeds: [new Discord.MessageEmbed()
                                               .setTitle(`${config.get(`title`)} | Avaliação`)
                                               .setDescription("")
                                               .addField(`<:info:1072588170153185360> Informações:`, `Escolha uma nota essa venda.`)
                                               .addField(`<a:estrelas:1072582030040240218> Estrelas:`, `Aguardando...`)
                                               .setFooter(`Você tem 30 segundos para avaliar...`)
                                               .setColor(config.get(`color`))], components: [rowavaliacao]})
                                             const interacaoavaliar = embed.createMessageComponentCollector({ componentType: "BUTTON", });
                                             interacaoavaliar.on("collect", async (interaction) => {
                                               if (interaction.user.id != interaction.user.id) {
                                                 return;
                                               }
                             
                                               if (interaction.isButton()) {
                                                 var textoest = ""
                                                 var estrelas = interaction.customId.replace("star", "")
                              
                                                 for (let i = 0; i != estrelas; i++) {
                                                   textoest = `${textoest} ⭐`
                                                 }
               
                                                   interaction.deferUpdate()               
                                                   embed.reply("<a:acept:1072582174164914187>| Obrigado pela avaliação!").then(msg => {
                                                     rowavaliacao.components[0].setDisabled(true)
                                                     rowavaliacao.components[1].setDisabled(true)
                                                     rowavaliacao.components[2].setDisabled(true)
                                                     rowavaliacao.components[3].setDisabled(true)
                                                     rowavaliacao.components[4].setDisabled(true)
                                                                  
                                                     const embednew = new Discord.MessageEmbed()
                                                       .setTitle(`${config.get(`title`)} | Avaliação`)
                                                       .setDescription("")
                                                       .addField(`<:info:1072588170153185360> Informações:`, `Escolha uma nota essa venda.`)
                                                       .addField(`<a:estrelas:1072582030040240218> Estrelas:`, `${textoest} (${estrelas})`)
                                                       .setColor(config.get(`color`))
                                                     embed.edit({ embeds: [embednew], components: [rowavaliacao] })
                                                     avaliacao = `${textoest} (${estrelas})`
                                            
                                                     interaction.channel.send({ embeds: [embed] })
                                                     const embedaprovadolog = new Discord.MessageEmbed()
                                                     .setTitle(`${config.get(`title`)} | Compra Aprovada`)
                                                     .addField(`<:cliente:1072582111934034070> | Comprador:`, `<@${interaction.user.id}>`)
                                                     .addField(`📅 | Data da compra:`, `${moment().format('LLLL')}`)
                                                     .addField(`<:carrinho:1072588828851843213> | Produto:`, `${eprod.nome}`)
                                                     .addField(`<:estoque:1072582246197903451> | Quantidade:`, `${quantidade1}x`)
                                                     .addField(`<:dinheiro:1072582093172920411> | Valor Pago:`, `R$${precoalt.toFixed(1)}`)
                                                     .addField(`<a:estrelas:1072582030040240218> | Avaliação:`, `${avaliacao}`)
                                                     .addField(`<:ticketlogsa:1072609428219629598> | Id da compra:`, `${data_id}`)
                                                     .setColor(config.get(`color`))
                                                     .setThumbnail(client.user.displayAvatarURL())
                                                   client.channels.cache.get(config.get(`logs`)).send({embeds: [embedaprovadolog]})
                                                   db3.set(`${data_id}.entrid`, `${removed.join(" \n")}`)

                                                   })
                                                 }  
                                               })
                                                                
                                               const row = new Discord.MessageActionRow()
                                                 .addComponents(
                                                   new Discord.MessageButton()
                                                     .setCustomId('reembolso')
                                                     .setEmoji('<:dinheiro:1072582093172920411>')
                                                     .setLabel('Reembolsar')
                                                     .setStyle('PRIMARY'),
                                               );
        
                                               const canalif = client.channels.cache.get(config.get(`logs_staff`))
                                               const message2 = await canalif.send({ embeds: [new Discord.MessageEmbed()
                                                 .setTitle(`${config.get(`title`)} | Compra Aprovada`)
                                                 .addField(`<:cliente:1072582111934034070> | Comprador:`, `${interaction.user}`)
                                                 .addField(`📅 | Data da compra:`, `${moment().format('LLLL')}`)
                                                 .addField(`<:carrinho:1072588828851843213> | Produto:`, `${eprod.nome}`)
                                                 .addField(`<:estoque:1072582246197903451> | Quantidade:`, `${quantidade1}x`)
                                                 .addField(`<:dinheiro:1072582093172920411>| Preço:`, `${precoalt.toFixed(1)}`)
                                                 .addField(`<:ticketlogsa:1072609428219629598> | Id da compra:`, `${data_id}`)
                                                 .addField(`Produto Entregue: `, `\`\`\`${removed.join(" \n")}\`\`\``)
                                                 .setColor(config.get(`color`))
                                                 .setThumbnail(client.user.displayAvatarURL())], components: [row]})
                                               const interação = message2.createMessageComponentCollector({ componentType: "BUTTON", })
                                                interação.on("collect", async (interaction) => {
                                                 if (interaction.customId === "reembolso") {
                                                   const user = interaction.user.id
                                                   if (interaction.user.id !== `${perms.get(`${user}_id`)}`) return interaction.reply({ content: '<a:recusar:1072582282315038802> | Você não está na lista de pessoas!', ephemeral: true })
                                                   interaction.deferUpdate()
                                                     mercadopago.configure({ access_token: `${config.get(`access_token`)}` });
                                                      var refund = { payment_id: `${data.body.id}` };
                                                       mercadopago.refund.create(refund).then(result => {
                                                        db3.set(`${data_id}.status`, `Reembolsado`)
                                                        message2.delete()
                                                        const message2new = new Discord.MessageEmbed()
                                                          .setTitle(`${config.get(`title`)} | Compra Reembolsada`)
                                                          .addField(`<:cliente:1072582111934034070> | Comprador:`, `${interaction.user}`)
                                                          .addField(`📅 | Data da compra:`, `${moment().format('LLLL')}`)
                                                          .addField(`<:carrinho:1072588828851843213> | Produto:`, `${eprod.nome}`)
                                                          .addField(`<:estoque:1072582246197903451> | Quantidade:`, `${quantidade1}x`)
                                                          .addField(`<:dinheiro:1072582093172920411> | Preço:`, `${precoalt.toFixed(1)}`)
                                                          .addField(`<:ticketlogsa:1072609428219629598> | Id da compra:`, `${data_id}`)
                                                          .setColor(config.get(`color`))
                                                          .setThumbnail(client.user.displayAvatarURL())
                                                        canalif.send({ embeds: [message2new] })
                                                      }).catch(function (error) { interaction.followUp({ content: '<a:recusar:1072582282315038802> | Houve algum erro durante a transação , provavelmente você pagou usando o comando pagar !', ephemeral: true }) });
                                                    }
                                                  })
                                                           
                                                    const row2 = new Discord.MessageActionRow()
                                                      .addComponents(
                                                        new Discord.MessageButton()
                                                          .setCustomId(interaction.customId)
                                                          .setLabel('Comprar')
                                                          .setEmoji("1012167651142930472")
                                                          .setStyle('SUCCESS'),
                                                    );
                                                                
                                                    const embed2 = new Discord.MessageEmbed()
                                                      .setTitle(`${config.get(`title`)} | Bot Store`)
                                                      .setDescription(`
\`\`\`
${db.get(`${interaction.customId}.desc`)}
\`\`\`
**<a:produto:1072582076068544633>| Nome:** __${db.get(`${interaction.customId}.nome`)}__
**<:dinheiro:1072582093172920411> | Preço:** __${db.get(`${interaction.customId}.preco`)}__
**<:estoque:1072582246197903451>| Estoque:** __${db.get(`${interaction.customId}.conta`).length}__`)
                                                      .setColor(config.get(`color`))
                                                      .setThumbnail(client.user.displayAvatarURL())
                                                    interaction.message.edit({ embeds: [embed2], components: [row2] })}}})}, 10000)
                                                
                                                    collector.on("collect", interaction => {
                                                     if (interaction.customId === 'codigo') {
                                                      row.components[0].setDisabled(true)
                                                      interaction.reply(data.body.point_of_interaction.transaction_data.qr_code)
                                                       const embed = new Discord.MessageEmbed()
                                                         .setTitle(`${config.get(`title`)} | Sistema de Compras`)
                                                         .setDescription(`
\`\`\`
Pague para receber o produto.
\`\`\``)
                                                         .addField(`<a:produto:1072582076068544633> | Nome:`, `${eprod.nome}`)
                                                         .addField(`<:estoque:1072582246197903451> | Quantidade:`, `${quantidade1}`)
                                                         .addField(`<:dinheiro:1072582093172920411> | Valor`, `${precoalt.toFixed(1)} Reais`) 
                                                         .addField(`<:pessoa:1072592011670077601> | Id da compra`, `${data_id}`) 
                                                         .setColor(config.get(`color`))
                                                         .setThumbnail(client.user.displayAvatarURL())
                                                         msg.edit({ embeds: [embed], content: `<@${interaction.user.id}>`, components: [row] })
                                                       }
                                                    
                                                       if (interaction.customId === 'qrcode') {
                                                        row.components[1].setDisabled(true)
                                                        const embed2 = new Discord.MessageEmbed()
                                                          .setTitle(`${config.get(`title`)} | Sistema de Compras`)
                                                          .setDescription(`
\`\`\`
Pague para receber o produto.
\`\`\``)
                                                          .addField(`<a:produto:1072582076068544633> | Nome:`, `${eprod.nome}`)
                                                          .addField(`<:estoque:1072582246197903451> | Quantidade:`, `${quantidade1}`)
                                                          .addField(`<:dinheiro:1072582093172920411> | Valor`, `${precoalt.toFixed(1)} Reais`) 
                                                          .addField(`<:pessoa:1072592011670077601> | Id da compra`, `${data_id}`) 
                                                          .setColor(config.get(`color`))
                                                          .setThumbnail(client.user.displayAvatarURL())
                                                        msg.edit({ embeds: [embed2], content: `<@${interaction.user.id}>`, components: [row] })
                                                        
                                                        const embed = new Discord.MessageEmbed()
                                                          .setTitle(`${config.get(`title`)} | QR Code`)
                                                          .setDescription(`Aponte a camera do seu dispositivo para o qrcode e escaneio-o, feito isso basta efetuar o pagamento e aguardar alguns segundos.`)
                                                          .setImage("attachment://payment.png")
                                                          .setColor(config.get(`color`))
                                                        interaction.reply({ embeds: [embed], files: [attachment] })
                                                       }
                                                    
                                                       if (interaction.customId === 'cancelarpix') {
                                                         clearInterval(lopp);
                                                         clearInterval(venda)
                                                         const embedcancelar3 = new Discord.MessageEmbed()
                            .setTitle(`${config.get(`title`)} | Compra Cancelada`)
                            .setDescription(`<a:recusar:1072582282315038802> | Você cancelou a compra, e todos os produtos foram devolvido para o estoque. Você pode voltar a comprar quando quiser!`)
                            .setColor(config.get(`color`))
                            .setThumbnail(client.user.displayAvatarURL())
                            interaction.user.send({embeds: [embedcancelar3]})
                                                         db3.delete(`${data_id}`)
                                                         if ((interaction.guild.channels.cache.find(c => c.topic === interaction.user.id))) { c.delete(); }
                                                        }
                                                      })
                                                    })
                                                  }).catch(function (error) {
                                                    console.log(error)
                                                    });
                                                  }
                                                })
                                             })
                                           }
                                         })
                                       })
                                     })
                                   }
                                 }
                               })

  // Responder menção
  client.on("messageCreate", message => {
    
    if (message.author.bot) return;
    if (message.channel.type == '')
    return
    if(message.content == `<@${client.user.id}>` || message.content == `<@!${client.user.id}>`) {
    let embed = new Discord.MessageEmbed()
    .setColor("BLACK")
    .setDescription(`**<:cliente:1072582111934034070> | Olá <@${message.author.id}>, sou um bot de vendas automáticas e o meu prefixo é \` ${config.get(`prefix`)} \`veja a minha lista de comandos com \`${config.get(`prefix`)}ajuda\`, caso queira um bot igual a este só chamar o** /K#6666 **na DM**`)
    message.reply({ embeds: [embed] })
    }
});
