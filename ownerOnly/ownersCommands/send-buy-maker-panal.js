const { SlashCommandBuilder,SelectMenuBuilder,StringSelectMenuBuilder, StringSelectMenuOptionBuilder, EmbedBuilder , PermissionsBitField, ActionRowBuilder,ButtonBuilder,MessageComponentCollector,ButtonStyle, Embed } = require("discord.js");
const { Database } = require("st.db")
const db = new Database("/database/data")
const setting = new Database("/database/settingsdata/setting")
const prices = new Database("/database/settingsdata/prices.json")
const statuses = new Database("/database/settingsdata/statuses")

module.exports = {
    ownersOnly:true,
    data: new SlashCommandBuilder()
    .setName('send-maker-subscribe')
    .setDescription(`ارسال بانل اشتراكات الميكرات`),
async execute(interaction) {
    await interaction.deferReply({ephemeral:true})
    let price1 = await setting.get(`balance_price_${interaction.guild.id}`) ?? 5000;
    let logroom =  await setting.get(`log_room_${interaction.guild.id}`)
    let probot = await setting.get(`probot_${interaction.guild.id}`)
    let clientrole = await setting.get(`client_role_${interaction.guild.id}`)
    let subscriberoo = setting.get(`subscribe_room_${interaction.guild.id}`)
    if(!price1||! subscriberoo || !logroom || !probot || !clientrole) return interaction.editReply({content:`**لم يتم تحديد الاعدادات**`})
    let subscriberoom = interaction.guild.channels.cache.find(ch => ch.id == subscriberoo)
        let embed2 = new EmbedBuilder()
    .setTitle(`**بانل اشتراك في بوت الميكر**`)
    .setDescription(`**يمكنك الاشتراك في بوت الميكر عن طريق القائمة**`)
    .setTimestamp()
    .setThumbnail(interaction.guild.iconURL({dynamic:true}))
    .setColor('#0000ff')
     .setImage('https://media.discordapp.net/attachments/1231963933426978930/1262780208935731290/7.png?ex=669a7a37&is=669928b7&hm=9ef9578acc3522f08867a44feaf907f99b56252c89f4ed5134ef3a6e6396f049&=&format=webp&quality=lossless&width=960&height=349')
    const theBots = [
        {
            name:`البرايم` , defaultPrice:150,tradeName:`bot_maker`
        },
        {
            name:`البريميوم` , defaultPrice:275,tradeName:`bot_maker_premium`
        },
        {
            name:`الالتيميت` , defaultPrice:450,tradeName:`bot_maker_ultimate`
        }
    ]
    theBots.forEach(async(theBot) => {
        let theBotStats = statuses.get(theBot.tradeName) ?? true
        embed2.addFields(
            {
                name:`**بوتات ${theBot.name} **` , value:`**السعر في السيرفر : \`${prices.get(theBot.tradeName+`_price_`+interaction.guild.id) ?? theBot.defaultPrice}\` عملة** <:Maker:1263613038062206986>` , inline:false
            }
        )
    })
    embed2.addFields(
    {
        name:`**البرايم**`,value:`**تبيع فقط البوتات العادية في سيرفرك**`,inline:false
    },
    {
        name:`**البريميوم**`,value:`**تبيع فقط البوتات العادية في سيرفرك مع اسم وصورة خاص ببوتك**`,inline:false
    },
    {
        name:`**الالتيميت**`,value:`**تبيع البوتات العادية في سيرفرك مع الاشتراكات البرايم والبريميوم وبيع الابتايم في سيرفرك مع اسم وصورة خاص ببوتك**`,inline:false
    },
    {
        name:`**اضافة التيميت بلس 🏆**`,value:`**تبيع البوتات العادية في سيرفرك مع الاشتراكات البرايم والبريميوم والالتيميت , وسعرها 1 مليون لكل 10 ايام ويمكنك شرائها من السيرفر الرسمي فقط**`,inline:false
    },
    )
        const select2 = new StringSelectMenuBuilder()
        .setCustomId('select_bot')
        .setPlaceholder('الاشتراك في بوت الميكر')
        .addOptions(
            new StringSelectMenuOptionBuilder()
            .setEmoji(`<:20240604_113317:1247931817181581452>`)
            .setLabel('Prime')
            .setDescription('الاشتراك في بوت الميكر برايم')
            .setValue('Bot_Maker_Subscribe'),
            new StringSelectMenuOptionBuilder()
            .setEmoji(`<:20240604_113317:1247931817181581452>`)
            .setLabel('Premium')
            .setDescription('الاشتراك في بوت الميكر بريميوم')
            .setValue('Bot_Maker_Premium_Subscribe'),
            new StringSelectMenuOptionBuilder()
            .setEmoji(`<:20240604_113317:1247931817181581452>`)
            .setLabel('Ultimate')
            .setDescription('الاشتراك في بوت الميكر التيميت')
            .setValue('Bot_Maker_Ultimate_Subscribe'),
            new StringSelectMenuOptionBuilder()
            .setEmoji(`🔁`)
            .setLabel('Reset')
            .setDescription('عمل اعادة تعيين للاختيار')
            .setValue('Reset_Selected'),);
            const row2 = new ActionRowBuilder().addComponents(select2)
const free = new ButtonBuilder()
    .setCustomId(`showMySubs`)
    .setEmoji('<:20240604_113505:1247931809648611350>')
    .setLabel('MySubs')
    .setStyle(ButtonStyle.Primary);
const row4 = new ActionRowBuilder()
    .addComponents(free);
        subscriberoom.send({embeds:[embed2],components:[row2, row4]})
    return interaction.editReply({content:`**تم ارسال بانل الاشتراكات**`})
}
}
