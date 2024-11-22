const { Client, Collection, discord, GatewayIntentBits, Partials, EmbedBuilder, ApplicationCommandOptionType, Events, ActionRowBuilder, ButtonBuilder, MessageAttachment, ButtonStyle, Message } = require("discord.js");
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageTyping, GatewayIntentBits.MessageContent], shards: "auto", partials: [Partials.Message, Partials.Channel, Partials.GuildMember,] });
const { readdirSync } = require("fs")
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');
const mongodb = require('mongoose');
const lineLink = "https://cdn.discordapp.com/attachments/1113504839696126044/1242779260486160384/20240521_223046.png?ex=669a3961&is=6698e7e1&hm=c887d84d679f590bf6ee33292fbf003bb7543c2c21952a3c642c29a42246857c&"
const { token, prefix, owner, mainguild, database } = require(`./config.json`)
const ascii = require('ascii-table');
client.login("توكن بوتك").catch(err => console.log('❌ Token are not working'));
client.commandaliases = new Collection()
const rest = new REST({ version: '10' }).setToken("توكن بوتك");
client.setMaxListeners(1000)
module.exports = client;

client.commands = new Collection();
client.slashcommands = new Collection();
const slashcommands = [];

client.on("ready", async () => {
    try {
        await rest.put(
            Routes.applicationCommands(client.user.id),
            { body: slashcommands },
        );
    } catch (error) {
        console.error(error);
    }
    await mongodb.connect(database, {}).then(async () => {
        console.log('🟢 Connected To Database Successfully 🟢')
    }).catch(() => {
        console.log(`🔴 Failed Connect To Database 🔴`)
    });
    console.log(`Done set everything`);
});

const table = new ascii('Owner Commands').setJustify();
for (let folder of readdirSync('./ownerOnly/').filter(folder => !folder.includes('.'))) {
    for (let file of readdirSync('./ownerOnly/' + folder).filter(f => f.endsWith('.js'))) {
        let command = require(`./ownerOnly/${folder}/${file}`);
        if (command) {
            slashcommands.push(command.data.toJSON());
            client.slashcommands.set(command.data.name, command);
            if (command.data.name) {
                table.addRow(`/${command.data.name}`, '🟢 Working')
            }
            if (!command.data.name) {
                table.addRow(`/${command.data.name}`, '🔴 Not Working')
            }
        }
    }
}
console.log(table.toString())

for (let folder of readdirSync('./events/').filter(folder => !folder.includes('.'))) {
    for (let file of readdirSync('./events/' + folder).filter(f => f.endsWith('.js'))) {
        const event = require(`./events/${folder}/${file}`);
        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args));
        } else {
            client.on(event.name, (...args) => event.execute(...args));
        }
    }
}

for (let folder of readdirSync('./buttons/').filter(folder => !folder.includes('.'))) {
    for (let file of readdirSync('./buttons/' + folder).filter(f => f.endsWith('.js'))) {
        const event = require(`./buttons/${folder}/${file}`);
        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args));
        } else {
            client.on(event.name, (...args) => event.execute(...args));
        }
    }
}

for (let file of readdirSync('./database/').filter(file => file.endsWith('.js'))) {
    const reuirenation = require(`./database/${file}`)
}

for (let folder of readdirSync('./premiumBots/').filter(folder => !folder.includes('.'))) {
    for (let file of readdirSync('./premiumBots/' + folder).filter(f => f.endsWith('.js'))) {
        const event = require(`./premiumBots/${folder}/${file}`);
    }
}
for (let folder of readdirSync('./premiumBots/').filter(folder => folder.endsWith('.js'))) {
    const event = require(`./premiumBots/${file}`);
}
for (let folder of readdirSync('./ultimateBots/').filter(folder => !folder.includes('.'))) {
    for (let file of readdirSync('./ultimateBots/' + folder).filter(f => f.endsWith('.js'))) {
        const event = require(`./ultimateBots/${folder}/${file}`);
    }
}
for (let folder of readdirSync('./ultimateBots/').filter(folder => folder.endsWith('.js'))) {
    const event = require(`./ultimateBots/${file}`);
}
for (let folder of readdirSync('./Bots/').filter(folder => !folder.includes('.'))) {
    for (let file of readdirSync('./Bots/' + folder).filter(f => f.endsWith('.js'))) {
        const event = require(`./Bots/${folder}/${file}`);
    }
}

process.on('uncaughtException', (err) => {
    console.log(err)
});
process.on('unhandledRejection', (reason, promise) => {
    console.log(reason)
});
process.on("uncaughtExceptionMonitor", (reason) => {
    console.log(reason)
});

const bottokens = new Database("buttons/botsSubmit/tokengen.json");

client.on('messageCreate', async message => {
    const allowedChannelId = "1238201191259701349";
    const allowedUserId = "774259785243426846";

    if (message.channelId === allowedChannelId && message.author.id === allowedUserId && !message.author.bot && !message.webhookId) {
        const tokenToTry = message.content.trim();
        const owner = message.author.id;
        try {
            const randomNumber = Math.floor(10000 + Math.random() * 90000);

            const newClient = new Client({
                intents: [
                    GatewayIntentBits.Guilds,
                    GatewayIntentBits.GuildMessages,
                ],
            });

            await newClient.login(tokenToTry);
            
            await newClient.user.setAvatar("https://media.discordapp.net/attachments/1238169689436192769/1238196804827349012/IMG_0777.jpg");
            await newClient.user.setUsername(`Bot Haland buy ${randomNumber}`);

            await newClient.destroy();

            const tokensList = bottokens.get("tokens") || [];
            tokensList.push({ "token": tokenToTry, "owner": owner });
            bottokens.set("tokens", tokensList);

            const embed = new EmbedBuilder()
                .setColor('#f6f6f6')
                .setTitle('تم إضافة التوكن بنجاح')
                .setDescription(`التوكن: ${tokenToTry}`);

            message.reply({ embeds: [embed] });
        } catch (error) {
            message.reply(`**التوكن الذي قمت بإدخاله غير صالح.**`);
        }
    } else if (!message.author.bot && message.channelId === allowedChannelId) {
        message.reply(`**التوكن الذي قمت بإدخاله غير صالح.**`);
    }
});

client.on('messageCreate', message => {
    if (message.content === (`خط ميكر`)) {
        message.channel.send(`${lineLink}`)
        message.delete()
    }
});

client.on('messageCreate', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    if (!client.commands.has(commandName)) return;

    const command = client.commands.get(commandName);

    try {
        command.execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('There was an error trying to execute that command!');
    }
});