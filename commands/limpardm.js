const Discord = require("discord.js");
module.exports = {
    name: "cleardm",
    aliases: ["cdm", "limpardm"],

    run: async (client, message) => {
      
  const dm = await message.member.createDM();
  await message.reply({content: "<a:acept:1072582174164914187> | A Sua DM foi limpa com sucesso!", ephemeral: true});

  const deleteMessages = await client.channels.cache
    .get(dm.id)
    .messages.fetch({ limit: 99 });

  await deleteMessages.map((msg) => {
    if (msg.author.bot) {
      msg.delete();
    }
  });
}
}