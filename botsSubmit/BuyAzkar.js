const { Client, Collection, discord,GatewayIntentBits, Partials , EmbedBuilder, ApplicationCommandOptionType , Events , ActionRowBuilder , ButtonBuilder ,MessageAttachment, ButtonStyle , Message } = require("discord.js");
const { Database } = require("st.db")
const setting = new Database("/database/settingsdata/setting");
const usersdata = new Database(`/database/usersdata/usersdata`);
const prices = new Database("/database/settingsdata/prices");
const invoices = new Database("/database/settingsdata/invoices");
const tokens = new Database("/tokens/tokens")
const tier1subscriptions = new Database("/database/makers/tier1/subscriptions")
const azkarDB = new Database("/Json-db/Bots/azkarDB.json")

let azkar = tokens.get(`azkar`)
const path = require('path');
const { readdirSync } = require("fs");
;module.exports = {
  name: Events.InteractionCreate,
  /**
   * @param {Interaction} interaction
  */
  async execute(interaction){
    if (interaction.isModalSubmit()) {
        if(interaction.customId == "BuyAzkar_Modal") {
            await interaction.deferReply({ephemeral:true})
            let userbalance = parseInt(usersdata.get(`balance_${interaction.user.id}_${interaction.guild.id}`))
            const Bot_token = interaction.fields.getTextInputValue(`Bot_token`)
            const Bot_prefix = interaction.fields.getTextInputValue(`Bot_prefix`)
            
            const client23 = new Client({intents: [GatewayIntentBits.Guilds,GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageTyping, GatewayIntentBits.MessageContent], shards: "auto", partials: [Partials.Message, Partials.Channel, Partials.GuildMember,]});
            
            try{
              const owner = interaction.user.id
                let price1 = prices.get(`azkar_price_${interaction.guild.id}`) || 1;
                price1 = parseInt(price1)
                
                function generateRandomCode() {
                    const characters = 'AazkarDEFGHIJKLMNOPQRSTUVWXYZaazkardefghijklmnopqrstuvwxyz0123456789';
                    let code = '';
                    for (let i = 0; i < 12; i++) {
                      if (i > 0 && i % 4 === 0) {
                        code += '-';
                      }
                      const randomIndex = Math.floor(Math.random() * characters.length);
                      code += characters.charAt(randomIndex);
                    }
                    return code;
                  }
                  const invoice = generateRandomCode();
                let doneembeduser = new EmbedBuilder()
                .setTitle(`**تم انشاء بوتك بنجاح**`)
                .setDescription(`**معلومات الفاتورة :**`)
                .addFields(
                    {
                        name:`**الفاتورة**`,value:`**\`${invoice}\`**`,inline:false
                    },
                    {
                        name:`**نوع البوت**`,value:`**\`اذكار\`**`,inline:false
                    },
                    {
                        name:`**توكن البوت**`,value:`**\`${Bot_token}\`**`,inline:false
                    },
                    {
                        name:`**البريفكس**`,value:`**\`${Bot_prefix}\`**`,inline:false
                    }
                )
                await invoices.set(`${invoice}_${interaction.guild.id}` , 
                {
                    type:`اذكار`,
                    token:`${Bot_token}`,
                    prefix:`${Bot_prefix}`,
                    userid:`${interaction.user.id}`,
                    guildid:`${interaction.guild.id}`,
                    serverid:`عام`,
                    price:price1
                })
                const { REST } = require('@discordjs/rest');
                const rest = new REST({ version: '10' }).setToken(Bot_token);
                const { Routes } = require('discord-api-types/v10');
                client23.on('ready' , async() => {
                  const newbalance = parseInt(userbalance) - parseInt(price1)
                  await usersdata.set(`balance_${interaction.user.id}_${interaction.guild.id}` , newbalance)
                  const thebut = new ButtonBuilder().setLabel(`دعوة البوت`).setStyle(ButtonStyle.Link).setURL(`https://discord.com/api/oauth2/authorize?client_id=${client23.user.id}&permissions=8&scope=bot%20applications.commands`);const rowss = new ActionRowBuilder().addComponents(thebut);
                 await interaction.user.send({embeds:[doneembeduser] , components:[rowss]})
                })
                let doneembedprove = new EmbedBuilder()
                .setColor(`Gold`)
                .setDescription(`**تم شراء بوت \`اذكار\` بواسطة : ${interaction.user}**`)
                .setTimestamp()
                let logroom =  setting.get(`log_room_${interaction.guild.id}`)
                let theroom = interaction.guild.channels.cache.find(ch => ch.id == logroom)
               await theroom.send({embeds:[doneembedprove]})
               let userbots = usersdata.get(`bots_${interaction.user.id}_${interaction.guild.id}`);
               if(!userbots) {
                await usersdata.set(`bots_${interaction.user.id}_${interaction.guild.id}` , 1)
               }else {
                userbots = userbots + 1
                await usersdata.set(`bots_${interaction.user.id}_${interaction.guild.id}` , userbots) 
               }
                await interaction.editReply({content:`**تم انشاء بوتك بنجاح وتم خصم \`${price1}\` من رصيدك**`})
                client23.commands = new Collection();
            client23.events = new Collection();
            const folderPath = path.resolve(__dirname, '../../Bots/azkar/slashcommand23');
            const prefix = Bot_prefix
            client23.azkarSlashCommands = new Collection();
  const azkarSlashCommands = [];
  const ascii = require("ascii-table");
  const table = new ascii("azkar commands").setJustify();
  for (let folder of readdirSync(folderPath).filter(
    (folder) => !folder.includes(".")
    )) {
      for (let file of readdirSync(`${folderPath}/` + folder).filter((f) =>
      f.endsWith(".js")
      )) {
        let command = require(`${folderPath}/${folder}/${file}`);
        if (command) {
          azkarSlashCommands.push(command.data.toJSON());
          client23.azkarSlashCommands.set(command.data.name, command);
          if (command.data.name) {
            table.addRow(`/${command.data.name}`, "🟢 Working");
          } else {
            table.addRow(`/${command.data.name}`, "🔴 Not Working");
          }
        }
  }
}

const folderPath3 = path.resolve(__dirname, '../../Bots/azkar/handlers');
for (let file of readdirSync(folderPath3).filter(f => f.endsWith('.js'))) {
    const event = require(path.join(folderPath3, file))(client23);
}
            client23.on("ready" , async() => {

                try {
                  await rest.put(
                    Routes.applicationCommands(client23.user.id),
                    { body: azkarSlashCommands },
                    );
                    
                  } catch (error) {
                    console.error(error)
                  }
          
              });
              const folderPath2 = path.resolve(__dirname, '../../Bots/azkar/events');

            for (let file of readdirSync(folderPath2).filter(f => f.endsWith('.js'))) {
                const event = require(path.join(folderPath2, file));
            }
                client23.on("interactionCreate" , async(interaction) => {
                    if (interaction.isChatInputCommand()) {
                        if(interaction.user.bot) return;
                      
                      const command = client23.azkarSlashCommands.get(interaction.commandName);
                        
                      if (!command) {
                        console.error(`No command matching ${interaction.commandName} was found.`);
                        return;
                      }
                      if (command.ownersOnly === true) {
                        if (owner != interaction.user.id) {
                          return interaction.reply({content: `❗ ***لا تستطيع استخدام هذا الامر***`, ephemeral: true});
                        }
                      }
                      try {
                        await command.execute(interaction);
                      } catch (error) {
                            console.error(`Error executing ${interaction.commandName}`);
                            console.error(error);
                        }
                    }
                  } )

                  client23.on("ready" , async() => {
                    setInterval(() => {
                      client23.guilds.cache.forEach(async(guild) => {
                        let theAzkarRoom = await azkarDB.get(`azkar_room_${guild.id}`)
                        if(!theAzkarRoom) return;
                        let theRoom = await guild.channels.cache.find(ch => ch.id == theAzkarRoom)
                        let {azkar} = require(`../../Bots/azkar/azkarData/azkar.json`)
                        let randomNum = Math.floor(Math.random() * azkar.length)
                        let randomZekr = azkar[randomNum]
                        let embed1 = new EmbedBuilder()
                        .setTitle(`**عطروا افواهكم بذكر الله**`)
                        .setColor(`Aqua`)
                        .setTimestamp()
                        .setFooter({text:`الأذكــار`})
                        .setThumbnail(`https://cdn.discordapp.com/attachments/1233498385206739046/1251332978395709490/20240615_012543.jpg?ex=666e3226&is=666ce0a6&hm=725f12045f743bc94273d0e8b17c21885a411f86b2a54147787b0f915ad5ae7e&`)
                        .setDescription(`**\`\`\`${randomZekr}\`\`\`**`)
                        await theRoom.send({embeds:[embed1]}).catch(async() => {return;})
                        //-
                        let thePrayersRoom = await azkarDB.get(`prayers_room_${guild.id}`)
                        if(!thePrayersRoom) return;
                        let theRoom2 = await guild.channels.cache.find(ch => ch.id == thePrayersRoom)
                        let {prayers} = require(`../../Bots/azkar/azkarData/prayers.json`)
                        let randomNum2 = Math.floor(Math.random() * prayers.length)
                        let randomPrayer = azkar[randomNum2]
                        let embed2 = new EmbedBuilder()
                        .setTitle(`**اَلدُّعَاءُ في الإسلام هي عبادة**`)
                        .setColor(`Aqua`)
                        .setTimestamp()
                        .setFooter({text:`اَلأدُّعَــيــة`})
                        .setThumbnail(`https://cdn.discordapp.com/attachments/1233498385206739046/1251332395278536775/20240615_012618.jpg?ex=666e319b&is=666ce01b&hm=f62ca85c1a342ead09bc74f14e3457706380f0ec2f04c9b9e825acd89e7eaacd&`)
                        .setDescription(`**\`\`\`${randomPrayer}\`\`\`**`)
                        await theRoom.send({embeds:[embed2]}).catch(async() => {return;})
                        //-
                        let theVersesRoom = await azkarDB.get(`verse_${guild.id}`)
                        if(!theVersesRoom) return;
                        let theRoom3 = await guild.channels.cache.find(ch => ch.id == theVersesRoom)
                        let {verses} = require(`../../Bots/azkar/azkarData/verses.json`)
                        let randomNum3 = Math.floor(Math.random() * verses.length)
                        let randomVerse = verses[randomNum3]
                        let embed3 = new EmbedBuilder()
                        .setTitle(`**أبتدئ قراءة القرآن باسم الله مستعينا به**`)
                        .setColor(`Aqua`)
                        .setTimestamp()
                        .setFooter({text:`الأيـــات`})
                        .setThumbnail(`https://cdn.discordapp.com/attachments/1233498385206739046/1251332395018223616/20240615_012642.jpg?ex=666e319b&is=666ce01b&hm=5770c30e18469744f428fbdcedb62ba5984d9970885a48476d541cf4249d5225&`)
                        .setDescription(`**\`\`\`${randomVerse}\`\`\`**`)
                        await theRoom3.send({embeds:[embed3]}).catch(async() => {return;})
                        //-
                        let theInfoRoom = await azkarDB.get(`verse_${guild.id}`)
                        if(!theInfoRoom) return;
                        let theRoom4 = await guild.channels.cache.find(ch => ch.id == theInfoRoom)
                        let {information} = require(`../../Bots/azkar/azkarData/information.json`)
                        let randomNum4 = Math.floor(Math.random() * information.length)
                        let randomInfo = information[randomNum4]
                        let embed4 = new EmbedBuilder()
                        .setTitle(`**زود ثقافتك بمعرفة دينك**`)
                        .setColor(`Aqua`)
                        .setTimestamp()
                        .setFooter({text:`الـمـعـلومـات الـديـنـيـة`})
                        .setThumbnail(`https://cdn.discordapp.com/attachments/1233498385206739046/1251332394724626442/20240615_012758.jpg?ex=666e319b&is=666ce01b&hm=f6c855e39bb7a8b0adb692cefa986ccef5d05f4aac241949466d6fdbeeb1a4f9&`)
                        .setDescription(`**\`\`\`${randomInfo}\`\`\`**`)
                        await theRoom3.send({embeds:[embed4]}).catch(async() => {return;})
                      })
                    },  1000 * 60 * 5);
                  })
                  await client23.login(Bot_token).catch(async() => {
                    return interaction.editReply({content:`**فشل التحقق , الرجاء تفعيل اخر ثلاث خيارات في قائمة البوت**`})
                  })
                  if(!azkar) {
                      await tokens.set(`azkar` , [{token:Bot_token,prefix:Bot_prefix,clientId:client23.user.id,owner:interaction.user.id,timeleft:2629744}])
                  }else {
                      await tokens.push(`azkar` , {token:Bot_token,prefix:Bot_prefix,clientId:client23.user.id,owner:interaction.user.id,timeleft:2629744})
                  }
        
            
            }catch(error){
                console.error(error)
                return interaction.editReply({content:`**قم بتفعيل الخيارات الثلاثة او التاكد من توكن البوت ثم اعد المحاولة**`})
            }
        }
    }
  }
}