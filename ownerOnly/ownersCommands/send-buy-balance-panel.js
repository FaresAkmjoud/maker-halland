const { SlashCommandBuilder, EmbedBuilder , PermissionsBitField, ActionRowBuilder,ButtonBuilder,MessageComponentCollector,ButtonStyle, Embed } = require("discord.js");
const { Database } = require("st.db")
const db = new Database("/database/data")
const { clientId,owner} = require('../../config.json');
const setting = new Database("/database/settingsdata/setting")

module.exports = {
    ownersOnly:true,
    data: new SlashCommandBuilder()
    .setName('send-buy-balance-panel')
    .setDescription(`ارسال بانل شراء الرصيد`),
async execute(interaction) {
    await interaction.deferReply({ephemeral:false})
    let price1 = await setting.get(`balance_price_${interaction.guild.id}`) ?? 5000;
    let recipient = await setting.get(`recipient_${interaction.guild.id}`)
    let transferroom = await setting.get(`transfer_room_${interaction.guild.id}`)
    let logroom =  await setting.get(`log_room_${interaction.guild.id}`)
    let probot = await setting.get(`probot_${interaction.guild.id}`)
    let clientrole = await setting.get(`client_role_${interaction.guild.id}`)
    let panelroom = await setting.get(`panel_room_${interaction.guild.id}`)
    let buybotroom = await setting.get(`buy_bot_room${interaction.guild.id}`)
    if(!price1 || !recipient || !transferroom || !logroom || !probot || !clientrole || !buybotroom) return interaction.editReply({content:`**لم يتم تحديد الاعدادات**`})
    let theroom = interaction.guild.channels.cache.find(ch => ch.id == panelroom)
    let embed = new EmbedBuilder()
    .setTitle(`**بانل شراء رصيد**`)
    .setDescription(`**يمكنك شراء رصيد عن طريق الضغط على الزر**`)
    .setImage(`https://media.discordapp.net/attachments/1231963933426978930/1262780210172919838/10.png?ex=669a7a37&is=669928b7&hm=59de4a3cbdc5756226b0e092759f82f41f3130ae492bae0dd1c7141132790dea&=&format=webp&quality=lossless&width=960&height=349`)
    .setTimestamp()
    const free = new ButtonBuilder()
    .setCustomId(`BuyBalanceButton`)
    .setLabel('شراء الرصيد')

    .setStyle(ButtonStyle.Secondary);
    const row = new ActionRowBuilder()
    .addComponents(free);
    theroom.send({embeds:[embed] , components:[row]})
    return interaction.editReply({content:`**تم ارسال الرسالة بنجاح**`})
}
}