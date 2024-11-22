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
            name:`كلل في واحد` , defaultPrice:100,tradeName:`all`
        }
    ]
    theBots.forEach(async(theBot) => {
        let theBotStats = statuses.get(theBot.tradeName) ?? true
        embed.addFields(
            {
                name:`**بوتات ${theBot.name} **` , value:`**السعر في السيرفر : \`${prices.get(theBot.tradeName+`_price_`+interaction.guild.id) ?? theBot.defaultPrice}\` عملة  ** ` , inline:false
            }
        )
    })
    const select = new StringSelectMenuBuilder()
    .setCustomId('select_bot')
    .setPlaceholder('قم بأختيار البوت من القائمة')
    .addOptions(
        new StringSelectMenuOptionBuilder() 
        .setLabel('Apply')
            .setDescription('شراء بوت تقديمات')
            .setValue('BuyApply'),
            new StringSelectMenuOptionBuilder()  
        .setLabel('Azkar')
            .setDescription('شراء بوت اذكار')
            .setValue('BuyAzkar'),
            new StringSelectMenuOptionBuilder()  
        .setLabel('Quran')
            .setDescription('شراء بوت قرأن')
            .setValue('BuyQuran'),
            new StringSelectMenuOptionBuilder()
            .setLabel('AutoLine')
            .setDescription('شراء بوت خط تلقائي')
            .setValue('BuyAutoline'),
            new StringSelectMenuOptionBuilder()
            .setLabel('Blacklist')
            .setDescription('شراء بوت بلاك ليست')
            .setValue('BuyBlacklist'),
            new StringSelectMenuOptionBuilder()
            .setLabel('Broadcast')
            .setDescription('شراء بوت برودكاست')
            .setValue('BuyBroadcast'),
            new StringSelectMenuOptionBuilder()
        .setLabel('Orders')
        .setDescription('شراء بوت طلبات')
        .setValue('BuyOrders'), 
            new StringSelectMenuOptionBuilder()
        .setLabel('Offer')
        .setDescription('شراء بوت عروض')
        .setValue('BuyOffer'), 
        new StringSelectMenuOptionBuilder()

        .setLabel('Private Rooms')
        .setDescription('شراء بوت رومات خاصة')   
        .setValue('BuyPrivateRooms'),   
        new StringSelectMenuOptionBuilder() 
        .setLabel('Normal Broadcast')
            .setDescription('شراء بوت برودكاست عادي')
            .setValue('BuyNormalBroadcast'),
            new StringSelectMenuOptionBuilder()
            .setLabel('Feedback')
            .setDescription('شراء بوت اراء')
            .setValue('BuyFeedback'),
            new StringSelectMenuOptionBuilder()
            .setLabel('Giveaway')
            .setDescription('شراء بوت جيف اواي')
            .setValue('BuyGiveaway'),
            new StringSelectMenuOptionBuilder()
            .setLabel('Logs')
            .setDescription('شراء بوت لوج')
            .setValue('BuyLogs'),
            new StringSelectMenuOptionBuilder()
            .setLabel('Nadeko')
            .setDescription('شراء بوت ناديكو')
            .setValue('BuyNadeko'),
            new StringSelectMenuOptionBuilder()
            .setLabel('Probot')
            .setDescription('شراء بوت  بروبوت بريميوم وهمي')
            .setValue('BuyProbot'),
            new StringSelectMenuOptionBuilder()
            .setLabel('Protect')
            .setDescription('شراء بوت حماية')
            .setValue('BuyProtect'),
            new StringSelectMenuOptionBuilder()
            .setLabel('Buy Roles')
            .setDescription('شراء بوت شراء رتب')
            .setValue('BuyRoles'),
            new StringSelectMenuOptionBuilder()
            .setLabel('Scammers')
            .setDescription('شراء بوت نصابين')
            .setValue('BuyScammers'),
            new StringSelectMenuOptionBuilder()
            .setLabel('Suggestions')
            .setDescription('شراء بوت اقتراحات')
            .setValue('BuySuggestions'),
            new StringSelectMenuOptionBuilder()
            .setLabel('System')
            .setDescription('شراء بوت سيستم')
            .setValue('BuySystem'),
            new StringSelectMenuOptionBuilder()
            .setLabel('Shop')
            .setDescription('شراء بوت شوب')
            .setValue('BuyShop'),
            new StringSelectMenuOptionBuilder()
            .setLabel('Shop Rooms')
            .setDescription('شراء بوت رومات شوب')
            .setValue('BuyShopRooms'),
            new StringSelectMenuOptionBuilder()
            .setLabel('Tax')
            .setDescription('شراء بوت ضريبة')
            .setValue('BuyTax'),
            new StringSelectMenuOptionBuilder()
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
            .setLabel('Self')
            .setDescription('شــراء جمع رتب')
            .setValue('BuySelf'),
            new StringSelectMenuOptionBuilder()
            .setLabel('Credit')
            .setDescription('شراء بوت كريدت وهمي')
            .setValue('BuyCredit'),
            new StringSelectMenuOptionBuilder()
            .setLabel('Ticket select')
  .setDescription('شراء بوت تكت بانل')
            .setValue('BuyTicket'),
            new StringSelectMenuOptionBuilder()
            .setLabel('Ticket button')
            .setDescription('شراء بوت تكت زر')
            .setValue('BuyTicketbil'),
            new StringSelectMenuOptionBuilder()
            .setLabel('Token')
            .setDescription('شراء بوت بيع توكنات')
            .setValue('Buytoken'),
            new StringSelectMenuOptionBuilder()
            .setLabel('Token Bot')
            .setDescription('شراء بوت بيع توكنات بوت')
            .setValue('Buytokenbot'),
            new StringSelectMenuOptionBuilder()
            .setLabel('Sell Project')
            .setDescription('شراء بوت بيع بروجكتات')
            .setValue('BuySeller'),
            new StringSelectMenuOptionBuilder()
            .setLabel('Sell Code')
            .setDescription('شراء بوت بيع اكواد')
            .setValue('BuyCode'),
            new StringSelectMenuOptionBuilder()
            .setLabel('Sell Tools')
            .setDescription('شراء بوت بيع ادوات')
            .setValue('BuyTools'),
            new StringSelectMenuOptionBuilder()
            .setLabel('Sell mongo')
            .setDescription('شراء بوت بيع مونجو')
            .setValue('Buymongo'),
            new StringSelectMenuOptionBuilder()
            .setLabel('Come')
            .setDescription('شراء بوت نداء')
            .setValue('BuyCome'),
            new StringSelectMenuOptionBuilder()
            .setLabel('all')
            .setDescription('شــراء بــوت الكل في واحد')
            .setValue('Buyall'),
            new StringSelectMenuOptionBuilder()
            .setLabel('Reset')
            .setDescription('عمل اعادة تعيين للاختيار')
            .setValue('Reset_Selected'),);
            const row3 = new ActionRowBuilder()
    .addComponents(select3);
const free = new ButtonBuilder()
    .setCustomId(`BuyBalanceButton`)
    .setLabel('BuyCoins')
    .setStyle(ButtonStyle.Primary);
const free1 = new ButtonBuilder()
    .setCustomId(`showMyBots`)
    .setLabel('MyCoins')
    .setStyle(ButtonStyle.Primary);

const free2 = new ButtonBuilder()
    .setCustomId(`weekly`)
    .setLabel('FreeCoins')
    .setStyle(ButtonStyle.Primary);

const free3 = new ButtonBuilder()
    .setCustomId(`usecode`)
    .setLabel('Redeem')
    .setStyle(ButtonStyle.Primary);

const free4 = new ButtonBuilder()
    .setCustomId(`buytokenyesno`)
    .setLabel('Buy Token Bot')
    .setStyle(ButtonStyle.Primary);

const row4 = new ActionRowBuilder()
    .addComponents(free,free1,free2,free3, free4);
    theroom.send({components:[row3, row4]})
    return interaction.editReply({content:`**تم ارسال بانل شراء البوتات**`})
    
}
}