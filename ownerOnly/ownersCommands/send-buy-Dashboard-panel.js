const { SlashCommandBuilder, EmbedBuilder , PermissionsBitField, ActionRowBuilder,ButtonBuilder,MessageComponentCollector,ButtonStyle, Embed, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require("discord.js");
const { Database } = require("st.db")
const db = new Database("/database/data")
const { clientId,owner} = require('../../config.json');
const setting = new Database("/database/settingsdata/setting")


module.exports = {
    ownersOnly:true,
    data: new SlashCommandBuilder()
    .setName('send-dashboard')
    .setDescription(`Send dashboard panel`),
async execute(interaction) {
    await interaction.deferReply({ephemeral:true})
    let dashboard = await setting.get(`dashboard_room_${interaction.guild.id}`)
    if(!dashboard) return interaction.editReply({content:`**لم يتم تحديد الاعدادات**`})
    let theroom = interaction.guild.channels.cache.find(ch => ch.id == dashboard)
    let embed = new EmbedBuilder()
    .setTitle(`**Maker Simple Dashboard**`)
    .setDescription(`هلا عزيزي مشتري هنا لوحة التحكم ببوتك الذي شتريتها من البوت ميكر خاص في هالاند ,اختار ماذا تريد أن تعمل من القائمه التي بالاسفل`)
    .setThumbnail(interaction.guild.iconURL())
    .setColor('#0000ff')
     .setImage('https://media.discordapp.net/attachments/1231963933426978930/1262780159078043719/12.png?ex=669a7a2b&is=669928ab&hm=7e01b58fd9f1c4641441962f7b80756504ee55ef6539904735c6fa9943988ca2&=&format=webp&quality=lossless&width=960&height=349')
    .setTimestamp();

   const select = new StringSelectMenuBuilder()
    .setCustomId('select_bot')
    .setPlaceholder('تحكم في بوتك')
    .addOptions(
            new StringSelectMenuOptionBuilder()
            .setLabel('Set Status')
            .setDescription('تعين حالة البوت')
        .setEmoji('<:20240604_113449:1247931814715068517>')
            .setValue('changeActive'),
            new StringSelectMenuOptionBuilder()
            .setLabel('Change Onwer')
            .setDescription('تغير صاحب البوت')
        .setEmoji('<:20240604_113449:1247931814715068517>')
            .setValue('ownerch'),
                    new StringSelectMenuOptionBuilder()
            .setLabel('Change Info Bot')
            .setDescription('تغير معلومات البوت')
        .setEmoji('<:20240604_113449:1247931814715068517>')
            .setValue('Buyinfo'),
                            new StringSelectMenuOptionBuilder()
            .setLabel('Show My Bot')
            .setDescription('اظهار بوتاتك')
        .setEmoji('<:20240604_113449:1247931814715068517>')
            .setValue('showMyBot'),
        new StringSelectMenuOptionBuilder()
            .setLabel('Reset')
            .setDescription('̨عمل اعادة تعين الاختيار')
.setEmoji('🔁')
            .setValue('Reset_Selected'),
        
    );

     const row = new ActionRowBuilder()
    .addComponents(select);



    theroom.send({embeds: [embed], components:[row]})
return interaction.editReply({ content: `**تم ارسال الرسالة بنجاح**` })
}
}