const { SlashCommandBuilder, EmbedBuilder , PermissionsBitField, ActionRowBuilder,ButtonBuilder,MessageComponentCollector,ButtonStyle,StringSelectMenuOptionBuilder,StringSelectMenuBuilder } = require("discord.js");
const { Database } = require("st.db")
const setting = new Database("/database/settingsdata/setting")
const statuses = new Database("/database/settingsdata/statuses")
const prices = new Database("/database/settingsdata/prices.json")
const tokens = new Database("tokens/tokens")
const process = require('process'); 

module.exports = {
    ownersOnly:true,
    data: new SlashCommandBuilder()
    .setName('setup')
    .setDescription('تسطيب النظام')
    .addUserOption(Option => Option
        .setName(`recipient`)
        .setDescription(`مستلم الارباح`)
        .setRequired(false))
        .addChannelOption(Option => Option
            .setName(`transferroom`)
            .setDescription(`روم تحويل من اجل شراء الرصيد`)
            .setRequired(false))
            .addChannelOption(Option => Option
                .setName(`logroom`)
                .setDescription(`روم لوج شراء البوتات`)
                .setRequired(false))
                .addChannelOption(Option => Option
                    .setName(`uptimeroom`)
                    .setDescription(`روم بانل شراء الابتايم`)
                    .setRequired(false))
            .addChannelOption(Option => Option
                .setName(`panelroom`)
                .setDescription(`روم بانل شراء الرصيد`)
                .setRequired(false))
                .addChannelOption(Option => Option
                    .setName(`buybotroom`)
                    .setDescription(`روم بانل شراء البوتات`)
                    .setRequired(false))
                        .addChannelOption(Option => Option
                        .setName(`dashboard`)
                        .setDescription(`روم داشبورد`)
                        .setRequired(false))
                    .addChannelOption(Option => Option
                        .setName(`subscriberoom`)
                        .setDescription(`روم بانل شراءاشتراك ميكر`)
                        .setRequired(false))
                        .addChannelOption(Option => Option
                            .setName(`statusroom`)
                            .setDescription(`روم الحالة للبوتات`)
                            .setRequired(false))
                .addRoleOption(Option => Option
                    .setName(`clientrole`)
                    .setDescription(`رول العملاء`)
                    .setRequired(false))
                .addUserOption(Option => Option
                    .setName(`probot`)
                    .setDescription(`البروبوت`)
                    .setRequired(false))
                    .addAttachmentOption(Option => Option
                        .setName(`line`)
                        .setDescription(`الخط`)
                        .setRequired(false))
        , // or false
async execute(interaction) {
    await interaction.deferReply({ephemeral:true})
   let recipient = interaction.options.getUser(`recipient`)
   let transferroom = interaction.options.getChannel(`transferroom`)
   let logroom = interaction.options.getChannel(`logroom`)
   let panelroom = interaction.options.getChannel(`panelroom`)
   let uptimeroom = interaction.options.getChannel(`uptimeroom`)
   let subscriberoom = interaction.options.getChannel(`subscriberoom`)
   let statusroom = interaction.options.getChannel(`statusroom`)
   let buybotroom = interaction.options.getChannel(`buybotroom`)
      let dashboard = interaction.options.getChannel(`dashboard`)
   let clientrole = interaction.options.getRole(`clientrole`)
   let probot = interaction.options.getUser(`probot`)
   let line = interaction.options.getAttachment(`line`)
   if(recipient) {
   await setting.set(`recipient_${interaction.guild.id}` , recipient.id)
   }
   if(transferroom) {
    await setting.set(`transfer_room_${interaction.guild.id}` , transferroom.id)
   }
   if(logroom) {
    await setting.set(`log_room_${interaction.guild.id}` , logroom.id)
   }
   if(clientrole) {
    await setting.set(`client_role_${interaction.guild.id}` , clientrole.id)
   }
   if(probot) {
    await setting.set(`probot_${interaction.guild.id}` , probot.id)
}
if(panelroom) {
    await setting.set(`panel_room_${interaction.guild.id}` , panelroom.id)
   }
    if(dashboard) {
await setting.set(`dashboard_room_${interaction.guild.id}` , dashboard.id)
}
if(buybotroom) {
    await setting.set(`buy_bot_room${interaction.guild.id}` , buybotroom.id)
   }
   if(uptimeroom) {
   await setting.set(`uptimeroom_${interaction.guild.id}` , uptimeroom.id)
   let uptimeEmbed = new EmbedBuilder()
   .setTitle(`**بانل شراء الابتايم**`)
   .setDescription(`**شراء الابتايم يكون بشكل اسبوعي او شهري بعد الانتهاء من المدة يتم التجديد تلقائيا عن طريق رصيدك اذا لم يوجد مع الرصيد الكافي سيتم حذف الرابط من البيانات الخاصة بالابتايم

   سعر الابتايم الاسبوعي : 35 عملة
   سعر الابتايم الشهري : 100 عملة
   
   ملاحظة قبل التجديد اذا لم يوجد معك رصيد للتجديد سيتم الارسال لك قبلها بيوم ليتم ابلاغك لأعادة شحن رصيدك حتى لا يتم حذف الرابط من البيانات
   يرجى التأكد من وضع رابط صحيح للابتايم لانه لا يمكن تعديله او استرجاع رصيدك
   يمكنك حذف رابط الابتايم في اي وقت لكن لا يمكن استرجاع المبلغ نهائيا**`)
   .setTimestamp()
   .setThumbnail(interaction.guild.iconURL({dynamic:true}))
   const select = new StringSelectMenuBuilder()
    .setCustomId('uptime_select')
    .setPlaceholder('Select Uptime Plan')
    .addOptions(
        new StringSelectMenuOptionBuilder()
            .setLabel(`ابتايم اسبوعي`)
            .setDescription(`شراء ابتايم لمدة اسبوع واحد فقط مقابل 35 عملة`)
            .setValue('weekly_uptime'),
            new StringSelectMenuOptionBuilder()
            .setLabel(`ابتايم شهري`)
            .setDescription(`شراء ابتايم لمدة شهر واحد مقابل 100 عملة`)
            .setValue('monthly_uptime'),
            new StringSelectMenuOptionBuilder()
            .setLabel(`حذف رابط`)
            .setDescription(`حذف رابط خاص بك من الابتايم`)
            .setValue('delete_uptime'),
    );
    const row = new ActionRowBuilder()
    .addComponents(select);
   await uptimeroom.send({embeds:[uptimeEmbed] , components:[row]})
   }
   if(subscriberoom) {
      await setting.set(`subscribe_room_${interaction.guild.id}` , subscriberoom.id)
   }
   if(line) {
    await setting.set(`line_${interaction.guild.id}` , line.url)
   }
   if(statusroom) {
    if(setting.has(`statusroom_${interaction.guild.id}`)) {
        let messageInfo = setting.get(`statusmessageinfo_${interaction.guild.id}`)
        let {channelid , messageid} = messageInfo;
        const theChannel = interaction.guild.channels.cache.find(ch => ch.id == channelid)
        await theChannel.messages.fetch(messageid)
        const theMessages = await theChannel.messages.cache.find(ms => ms.id == messageid)
        await theMessages.delete();
    }
    await setting.set(`statusroom_${interaction.guild.id}` , statusroom.id);
    const embed1 = new EmbedBuilder()
    .setTitle(`**الحالة العامة للبوتات**`)
    const theBots = [
        {
            name:`التقديم` , defaultPrice:15,tradeName:`apply`
        },
        {
            name:`الخط التلقائي` , defaultPrice:15,tradeName:`autoline`
        },
        {
            name:`البلاك ليست` , defaultPrice:15,tradeName:`blacklist`
        },
        {
            name:`التحكم في البرودكاست` , defaultPrice:40,tradeName:`bc`
        },
        {
            name:`الطلبات` , defaultPrice:20,tradeName:`orders`
		},
        {
			name:`رومات الشوب`,defaultPrice:20,tradeName:`shopRooms`
		},
		{
			name:`البرودكاست العادي` , defaultPrice:20,tradeName:`Broadcast2`
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
		}
    ]
    theBots.forEach(async(theBot) => {
        let theBotTokens = tokens.get(theBot.tradeName)
        let theBotStats = statuses.get(theBot.tradeName) ?? true
        embed1.addFields(
            {
                name:`**بوتات ${theBot.name} 🟢**` , value:`**السعر في السيرفر : \`${prices.get(theBot.tradeName+`_price_`+interaction.guild.id) ?? theBot.defaultPrice}\` عملة**\nعدد البوتات العامة : \`${theBotTokens.length ?? 0}\`` , inline:false
            }
        )
    })
    const totalSeconds = process.uptime();
	const days = Math.floor(totalSeconds / (3600 * 24)); 
	const remainingSecondsAfterDays = totalSeconds % (3600 * 24);
	const hours = Math.floor(remainingSecondsAfterDays / 3600);
	const remainingSecondsAfterHours = remainingSecondsAfterDays % 3600;
	const minutes = Math.floor(remainingSecondsAfterHours / 60);
	const seconds = Math.floor(remainingSecondsAfterHours % 60);
    embed1.addFields(
        {
            name:`**تم الرفع لمدة :**` , inline:false,value:`**\`${days}\` Days,\`${hours}\` Hours , \`${minutes}\` Minutes , \`${seconds}\` Seconds  بدون انقطاع**`
        }
    )
    embed1.setColor('DarkGold')
	embed1.setThumbnail(interaction.guild.iconURL({dynamic:true}))
    embed1.setFooter({text:interaction.guild.name , iconURL:interaction.guild.iconURL({dynamic:true})})

    const theMsg = await statusroom.send({embeds:[embed1]});
    await setting.set(`statusmessageinfo_${interaction.guild.id}` , {messageid:theMsg.id,channelid:theMsg.channel.id});
   }
   
   if(!recipient && !line && !subscriberoom && !statusroom && !transferroom && !logroom && !clientrole && !probot && !panelroom && !buybotroom && !dashboard) return interaction.editReply({content:`**الرجاء تحديد اعداد واحد على الاقل**`}) 
   return interaction.editReply({content:`**تم تحديد الاعدادات بنجاح**`})
}
}