const { SlashCommandBuilder,SelectMenuBuilder,StringSelectMenuBuilder, StringSelectMenuOptionBuilder, EmbedBuilder , PermissionsBitField, ActionRowBuilder,ButtonBuilder,MessageComponentCollector,ButtonStyle, Embed } = require("discord.js");
const { Database } = require("st.db")
const db = new Database("/database/data")
const setting = new Database("/database/settingsdata/setting")
const prices = new Database("/database/settingsdata/prices.json")
const statuses = new Database("/database/settingsdata/statuses")

module.exports = {
    ownersOnly:true,
    data: new SlashCommandBuilder()
    .setName('send-buy-bot-panel')
    .setDescription(`ارسال بانل شراء البوتات`),
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
    let theroom = interaction.guild.channels.cache.find(ch => ch.id == buybotroom)
    let embed = new EmbedBuilder()
    .setTitle(`**بانل شراء بوت**`)
    .setDescription(`**يمكنك شراء بوت عن طريق الضغط على البوت من القائمة**`)
    .setTimestamp()
    .setThumbnail(interaction.guild.iconURL({dynamic:true}))
    .setColor('#0000ff')
     .setImage('https://media.discordapp.net/attachments/1231963933426978930/1262780209673932931/9.png?ex=669a7a37&is=669928b7&hm=adda08c81e0dc9e13ff73682222c1e79c7dc905ae19c7b1eb9143077a8df235c&=&format=webp&quality=lossless&width=960&height=349')
    const theBots = [
        {
            name:`التقديم` , defaultPrice:15,tradeName:`apply`
        },
        {
            name:`الاذكار`,defaultPrice:1,tradeName:`azkar`
        },
        {
            name:`القرأن`,defaultPrice:1,tradeName:`quran`
        },
        {
            name:`الخط التلقائي` , defaultPrice:15,tradeName:`autoline`
        },
        {
            name:`البلاك ليست` , defaultPrice:15,tradeName:`blacklist`
        },
        {
            name:`الطلبات`,defaultPrice:20,tradeName:`orders`
        },
        {
			name:`رومات الشوب`,defaultPrice:20,tradeName:`shopRooms`
		},
        {
            name:`التحكم في البرودكاست` , defaultPrice:40,tradeName:`bc`
        },
		{
			name:`البرودكاست العادي` , defaultPrice:20,tradeName:`Broadcast2`
		},
        {
          name:`الرومات الخاصة` , defaultPrice:20,tradeName:`privateRooms`  
        },
        {
            name:`بيع بروجكتات` , defaultPrice:15,tradeName:`seller`
        },
                {
            name:`بيع اكواد` , defaultPrice:15,tradeName:`code`
        },
        {
            name:`بيع ادوات` , defaultPrice:15,tradeName:`tools`
        },
                {
            name:`بيع مونجو` , defaultPrice:40,tradeName:`mongo`
        },
        {
            name:`بيع توكنات` , defaultPrice:100,tradeName:`token`
        },
                {
            name:`بوت عروض` , defaultPrice:20,tradeName:`offer`
        },
        {
            name:`بيع توكنات بوت` , defaultPrice:60,tradeName:`tokenbot`
        },
        {
            name:`جمع رتب` , defaultPrice:15,tradeName:`self`
        },
        {
            name:`الكريدت الوهمي` , defaultPrice:15,tradeName:`credit`
        },
        {
            name:`الاراء` , defaultPrice:15,tradeName:`feedback`
        },
        {
            name:`الجيف اواي` , defaultPrice:15,tradeName:`giveaway`
        },
        {
            name:`اللوج` , defaultPrice:15,tradeName:`logs`
        },
        {
            name:`الناديكو` , defaultPrice:15,tradeName:`nadeko`
        },
        {
            name:`البروبوت بريميوم الوهمي` , defaultPrice:15,tradeName:`probot`
        },
		{
			name:`الحماية` , defaultPrice:20 , tradeName:`protect`
		},
        {
			name:`شراء الرتب` , defaultPrice:25 , tradeName:`roles`
		},
        {
            name:`النصابين` , defaultPrice:15,tradeName:`scam`
        },
        {
            name:`الاقتراحات` , defaultPrice:15,tradeName:`suggestions`
        },
		{
			name:`السيستم` , defaultPrice:35 , tradeName:`system`
		},
        {
            name:`الضريبة` , defaultPrice:15,tradeName:`tax`
        },
        {
            name:`التكت` , defaultPrice:40,tradeName:`ticket`
        },
		{
			name:`الشوب` , defaultPrice:40,tradeName:`shop`
		},
		{
			name:`نداء` , defaultPrice:15,tradeName:`BuyCome`
		},
		{
			name:`بوت بيع نسخ سيرفرات` , defaultPrice:90,tradeName:`BuyCopy`
		},
        {
            name:`كلل في واحد` , defaultPrice:100,tradeName:`all`
        }
    ]
    theBots.forEach(async(theBot) => {
        let theBotStats = statuses.get(theBot.tradeName) ?? true
        embed.addFields(
            {
                name:`**بوتات ${theBot.name} **` , value:`**السعر في السيرفر : \`${prices.get(theBot.tradeName+`_price_`+interaction.guild.id) ?? theBot.defaultPrice}\` عملة  ** <:Maker:1263613038062206986> ` , inline:false
            }
        )
    })
    const select = new StringSelectMenuBuilder()
    .setCustomId('select_bot')
    .setPlaceholder('قم بأختيار البوت من القائمة')
    .addOptions(
        new StringSelectMenuOptionBuilder()
        .setEmoji(`<:20240604_113317:1247931817181581452>`)    
        .setLabel('Apply')
            .setDescription('شراء بوت تقديمات')
            .setValue('BuyApply'),
            new StringSelectMenuOptionBuilder()
        .setEmoji(`<:20240604_113317:1247931817181581452>`)    
        .setLabel('Azkar')
            .setDescription('شراء بوت اذكار')
            .setValue('BuyAzkar'),
            new StringSelectMenuOptionBuilder()
        .setEmoji(`<:20240604_113317:1247931817181581452>`)    
        .setLabel('Quran')
            .setDescription('شراء بوت قرأن')
            .setValue('BuyQuran'),
            new StringSelectMenuOptionBuilder()
            .setEmoji(`<:20240604_113317:1247931817181581452>`)
            .setLabel('AutoLine')
            .setDescription('شراء بوت خط تلقائي')
            .setValue('BuyAutoline'),
            new StringSelectMenuOptionBuilder()
            .setEmoji(`<:20240604_113317:1247931817181581452>`)
            .setLabel('Blacklist')
            .setDescription('شراء بوت بلاك ليست')
            .setValue('BuyBlacklist'),
            new StringSelectMenuOptionBuilder()
            .setEmoji(`<:20240604_113317:1247931817181581452>`)
            .setLabel('Broadcast')
            .setDescription('شراء بوت برودكاست')
            .setValue('BuyBroadcast'),
            new StringSelectMenuOptionBuilder()
        .setLabel('Orders')
        .setDescription('شراء بوت طلبات')
        .setEmoji(`<:20240604_113317:1247931817181581452>`)    
        .setValue('BuyOrders'), 
            new StringSelectMenuOptionBuilder()
        .setLabel('Offer')
        .setDescription('شراء بوت عروض')
        .setEmoji(`<:20240604_113317:1247931817181581452>`)    
        .setValue('BuyOffer'), 
        new StringSelectMenuOptionBuilder()

        .setLabel('Private Rooms')
        .setDescription('شراء بوت رومات خاصة')
        .setEmoji(`<:20240604_113317:1247931817181581452>`)    
        .setValue('BuyPrivateRooms'),   
        new StringSelectMenuOptionBuilder()
        .setEmoji(`<:20240604_113317:1247931817181581452>`)    
        .setLabel('Normal Broadcast')
            .setDescription('شراء بوت برودكاست عادي')
            .setValue('BuyNormalBroadcast'),
            new StringSelectMenuOptionBuilder()
            .setEmoji(`<:20240604_113317:1247931817181581452>`)
            .setLabel('Feedback')
            .setDescription('شراء بوت اراء')
            .setValue('BuyFeedback'),
            new StringSelectMenuOptionBuilder()
            .setEmoji(`<:20240604_113317:1247931817181581452>`)
            .setLabel('Giveaway')
            .setDescription('شراء بوت جيف اواي')
            .setValue('BuyGiveaway'),
            new StringSelectMenuOptionBuilder()
            .setEmoji(`<:20240604_113317:1247931817181581452>`)
            .setLabel('Logs')
            .setDescription('شراء بوت لوج')
            .setValue('BuyLogs'),
            new StringSelectMenuOptionBuilder()
            .setEmoji(`<:20240604_113317:1247931817181581452>`)
            .setLabel('Nadeko')
            .setDescription('شراء بوت ناديكو')
            .setValue('BuyNadeko'),
            new StringSelectMenuOptionBuilder()
            .setEmoji(`<:20240604_113317:1247931817181581452>`)
            .setLabel('Probot')
            .setDescription('شراء بوت  بروبوت بريميوم وهمي')
            .setValue('BuyProbot'),
            new StringSelectMenuOptionBuilder()
            .setEmoji(`<:20240604_113317:1247931817181581452>`)
            .setLabel('Protect')
            .setDescription('شراء بوت حماية')
            .setValue('BuyProtect'),
            new StringSelectMenuOptionBuilder()
            .setEmoji(`<:20240604_113317:1247931817181581452>`)
            .setLabel('Buy Roles')
            .setDescription('شراء بوت شراء رتب')
            .setValue('BuyRoles'),
            new StringSelectMenuOptionBuilder()
            .setEmoji(`<:20240604_113317:1247931817181581452>`)
            .setLabel('Scammers')
            .setDescription('شراء بوت نصابين')
            .setValue('BuyScammers'),
            new StringSelectMenuOptionBuilder()
            .setEmoji(`<:20240604_113317:1247931817181581452>`)
            .setLabel('Suggestions')
            .setDescription('شراء بوت اقتراحات')
            .setValue('BuySuggestions'),
            new StringSelectMenuOptionBuilder()
            .setEmoji(`<:20240604_113317:1247931817181581452>`)
            .setLabel('System')
            .setDescription('شراء بوت سيستم')
            .setValue('BuySystem'),
            new StringSelectMenuOptionBuilder()
            .setEmoji(`<:20240604_113317:1247931817181581452>`)
            .setLabel('Shop')
            .setDescription('شراء بوت شوب')
            .setValue('BuyShop'),
            new StringSelectMenuOptionBuilder()
            .setLabel('Shop Rooms')
            .setEmoji(`<:20240604_113317:1247931817181581452>`)
            .setDescription('شراء بوت رومات شوب')
            .setValue('BuyShopRooms'),
            new StringSelectMenuOptionBuilder()
            .setEmoji(`<:20240604_113317:1247931817181581452>`)
            .setLabel('Tax')
            .setDescription('شراء بوت ضريبة')
            .setValue('BuyTax'),
            new StringSelectMenuOptionBuilder()
            .setEmoji(`🔁`)
            .setLabel('Reset')
            .setDescription('عمل اعادة تعيين للاختيار')
            .setValue('Reset_Selected'),
    );
    const row = new ActionRowBuilder()
    .addComponents(select);
    theroom.send({embeds:[embed] , components:[row]})

    const select3 = new StringSelectMenuBuilder()
    .setCustomId('select_bot')
        .setPlaceholder('قم بأختيار البوت من القائمة')
        .addOptions(
            new StringSelectMenuOptionBuilder()
            .setEmoji(`<:20240604_113317:1247931817181581452>`)
            .setLabel('Self')
            .setDescription('شــراء جمع رتب')
            .setValue('BuySelf'),
            new StringSelectMenuOptionBuilder()
            .setEmoji(`<:20240604_113317:1247931817181581452>`)
            .setLabel('Credit')
            .setDescription('شراء بوت كريدت وهمي')
            .setValue('BuyCredit'),
            new StringSelectMenuOptionBuilder()
            .setEmoji(`<:20240604_113317:1247931817181581452>`)
            .setLabel('Ticket select')
  .setDescription('شراء بوت تكت بانل')
            .setValue('BuyTicket'),
            new StringSelectMenuOptionBuilder()
            .setEmoji(`<:20240604_113317:1247931817181581452>`)
            .setLabel('Ticket button')
            .setDescription('شراء بوت تكت زر')
            .setValue('BuyTicketbil'),
            new StringSelectMenuOptionBuilder()
            .setEmoji(`<:20240604_113317:1247931817181581452>`)
            .setLabel('Token')
            .setDescription('شراء بوت بيع توكنات')
            .setValue('Buytoken'),
            new StringSelectMenuOptionBuilder()
            .setEmoji(`<:20240604_113317:1247931817181581452>`)
            .setLabel('Token Bot')
            .setDescription('شراء بوت بيع توكنات بوت')
            .setValue('Buytokenbot'),
            new StringSelectMenuOptionBuilder()
            .setEmoji(`<:20240604_113317:1247931817181581452>`)
            .setLabel('Sell Project')
            .setDescription('شراء بوت بيع بروجكتات')
            .setValue('BuySeller'),
            new StringSelectMenuOptionBuilder()
            .setEmoji(`<:20240604_113317:1247931817181581452>`)
            .setLabel('Sell Code')
            .setDescription('شراء بوت بيع اكواد')
            .setValue('BuyCode'),
            new StringSelectMenuOptionBuilder()
            .setEmoji(`<:20240604_113317:1247931817181581452>`)
            .setLabel('Sell Tools')
            .setDescription('شراء بوت بيع ادوات')
            .setValue('BuyTools'),
            new StringSelectMenuOptionBuilder()
            .setEmoji(`<:20240604_113317:1247931817181581452>`)
            .setLabel('Sell mongo')
            .setDescription('شراء بوت بيع مونجو')
            .setValue('Buymongo'),
            new StringSelectMenuOptionBuilder()
            .setEmoji(`<:20240604_113317:1247931817181581452>`)
            .setLabel('Come')
            .setDescription('شراء بوت نداء')
            .setValue('BuyCome'),
            new StringSelectMenuOptionBuilder()
            .setEmoji(`<:20240604_113317:1247931817181581452>`)
            .setLabel('all')
            .setDescription('شــراء بــوت الكل في واحد')
            .setValue('Buyall'),
            new StringSelectMenuOptionBuilder()
            .setEmoji(`🔁`)
            .setLabel('Reset')
            .setDescription('عمل اعادة تعيين للاختيار')
            .setValue('Reset_Selected'),);
            const row3 = new ActionRowBuilder()
    .addComponents(select3);
const free = new ButtonBuilder()
    .setCustomId(`BuyBalanceButton`)
    .setEmoji('<:20240604_113505:1247931809648611350>')
    .setLabel('BuyCoins')
    .setStyle(ButtonStyle.Primary);
const free1 = new ButtonBuilder()
    .setCustomId(`showMyBots`)
    .setEmoji('<:20240604_113505:1247931809648611350>')
    .setLabel('MyCoins')
    .setStyle(ButtonStyle.Primary);

const free2 = new ButtonBuilder()
    .setCustomId(`weekly`)
    .setEmoji('<:20240604_113505:1247931809648611350>')
    .setLabel('FreeCoins')
    .setStyle(ButtonStyle.Primary);

const free3 = new ButtonBuilder()
    .setCustomId(`usecode`)
    .setEmoji('<:20240604_113449:1247931814715068517>')
    .setLabel('Redeem')
    .setStyle(ButtonStyle.Primary);

const free4 = new ButtonBuilder()
    .setCustomId(`buytokenyesno`)
    .setEmoji('<:20240604_113449:1247931814715068517>')
    .setLabel('Buy Token Bot')
    .setStyle(ButtonStyle.Primary);

const row4 = new ActionRowBuilder()
    .addComponents(free,free1,free2,free3, free4);
    theroom.send({components:[row3, row4]})
    return interaction.editReply({content:`**تم ارسال بانل شراء البوتات**`})
    
}
}